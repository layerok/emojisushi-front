import * as S from "./styled";
import {
  FlexBox,
  Input,
  Switcher,
  ButtonOutline,
  AuthModal,
  Dropdown,
} from "~components";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrderApi from "~api/order.api";
import {
  Await,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "~hooks/use-auth-store";
import { useSpot } from "~hooks";
import { IGetShippingMethodsResponse } from "~api/shipping.api";
import { IGetPaymentMethodsResponse } from "~api/payment.api";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { CartProduct } from "~models";
import { IGetCartProductsResponse } from "~api/cart.api";

// todo: logout user if his token is expired
// timer may be solution

export const CheckoutForm = observer(() => {
  const AuthStore = useAuthStore();

  const cart = useAsyncValue() as IGetCartProductsResponse;
  const optimisticCartTotal = useOptimisticCartTotalPrice({
    items: cart.data.map((json) => new CartProduct(json)),
  });
  const { paymentMethods, shippingMethods } = useLoaderData() as any;

  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const user = AuthStore.user;
  const spot = useSpot();
  const CheckoutSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t("validation.required", { field: t("common.phone") }))
      .test(
        "is-possible-phone-number",
        () => t("checkout.form.errors.ua_phone"),
        (value) => {
          const regex =
            /^(((\+?)(38))\s?)?(([0-9]{3})|(\([0-9]{3}\)))(\-|\s)?(([0-9]{3})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{2})|([0-9]{2})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{3})|([0-9]{2})(\-|\s)?([0-9]{3})(\-|\s)?([0-9]{2}))$/;
          return regex.test(value ?? "");
        }
      ),
    email: Yup.string().email("Invalid email"),
  });

  const formik = useFormik({
    initialValues: {
      name: user ? user.fullName : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      address: "",
      address_id: null,
      comment: "",
      sticks: "",
      change: "",
      payment_method_id: 1,
      shipping_method_id: 1,
    },
    validationSchema: CheckoutSchema,
    onSubmit: (values) => {
      setPending(true);
      const [firstname, lastname] = values.name.split(" ");
      OrderApi.place({
        phone: values.phone,
        firstname: firstname,
        lastname: lastname,
        email: values.email,
        spot_id_or_slug: spot.slug,

        address: values.address,
        address_id: values.address_id,
        payment_method_id: values.payment_method_id,
        shipping_method_id: values.shipping_method_id,

        change: values.change,
        sticks: +values.sticks,
        comment: values.comment,
      })
        .then((res) => {
          // todo: revalidate cart, because it is empty now
          if (res.data?.success) {
            navigate("/thankyou");
          }
        })
        .catch((e) => {
          if (e.response.data?.errors) {
            formik.setErrors(e.response.data.errors);
          }
        })
        .finally(() => {
          setPending(false);
        });
    },
  });

  return (
    <S.Form onSubmit={formik.handleSubmit}>
      {!AuthStore.isAuthorized && (
        <FlexBox style={{ marginBottom: "20px" }}>
          {t("checkout.alreadyHaveAccount")}
          <AuthModal>
            <S.SignIn>{t("common.login")}</S.SignIn>
          </AuthModal>
        </FlexBox>
      )}

      <Suspense fallback={"...loading shipping methods"}>
        <Await resolve={shippingMethods}>
          <ShippingMethods formik={formik} />
        </Await>
      </Suspense>

      <S.Control>
        <Input
          name={"name"}
          placeholder={t("common.first_name")}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </S.Control>

      {!user && (
        <S.Control>
          <Input
            name={"email"}
            placeholder={t("common.email")}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </S.Control>
      )}
      <S.Control>
        <Input
          name={"phone"}
          required={true}
          placeholder={t("common.phone")}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          value={formik.values.phone}
        />
      </S.Control>
      <S.Control>
        <Input
          name={"sticks"}
          type={"number"}
          min={"0"}
          placeholder={t("checkout.form.sticks")}
          onChange={formik.handleChange}
          value={formik.values.sticks}
        />
      </S.Control>
      <S.Control>
        <Input
          name={"comment"}
          placeholder={t("checkout.form.comment")}
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
      </S.Control>
      <Suspense>
        <Await resolve={paymentMethods}>
          <PaymentMethods formik={formik} />
        </Await>
      </Suspense>
      {Object.keys(formik.errors).length > 0 && (
        <S.Control>
          <S.ErrorBag>
            {Object.keys(formik.errors).map((key, i) => (
              <li key={key}>{formik.errors[key]}</li>
            ))}
          </S.ErrorBag>
        </S.Control>
      )}

      <S.Control>
        <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
          <ButtonOutline loading={pending} type={"submit"} width={"160px"}>
            {t("checkout.order")}
          </ButtonOutline>
          <S.Total>
            {t("checkout.to_pay")} {optimisticCartTotal} ₴
          </S.Total>
        </FlexBox>
      </S.Control>
    </S.Form>
  );
});

const ShippingMethods = ({ formik }) => {
  const { t } = useTranslation();

  const shippingMethods = useAsyncValue() as IGetShippingMethodsResponse;
  const getShippingType = () => {
    return shippingMethods.data.find(
      (item) => item.id === +formik.values.shipping_method_id
    );
  };
  return (
    <>
      <Switcher
        name={"shipping_method_id"}
        options={shippingMethods.data.map((item) => ({
          id: item.id,
          name: t("shippingMethods." + item.code, item.name),
        }))}
        selected={(option) => {
          return option.id === getShippingType().id;
        }}
        handleChange={({ e, index }) => {
          formik.handleChange(e);
        }}
      />
      {getShippingType()?.id === 2 && (
        <AddressDropdownOrInput formik={formik} />
      )}
    </>
  );
};

const PaymentMethods = ({ formik }) => {
  const { t } = useTranslation();
  const paymentMethods = useAsyncValue() as IGetPaymentMethodsResponse;
  const getPaymentType = () => {
    return paymentMethods.data.find(
      (item) => item.id === +formik.values.payment_method_id
    );
  };
  return (
    <>
      <S.Control>
        <Switcher
          name={"payment_method_id"}
          options={paymentMethods.data.map((item) => ({
            id: item.id,
            name: t("paymentMethods." + item.code, item.name),
          }))}
          handleChange={({ e, index }) => {
            formik.handleChange(e);
          }}
          selected={(option) => option.id === getPaymentType().id}
        />
      </S.Control>
      {getPaymentType()?.code === "cash" && (
        <S.Control>
          <Input
            name={"change"}
            placeholder={t("checkout.form.change")}
            onChange={formik.handleChange}
            value={formik.values.change}
          />
        </S.Control>
      )}
    </>
  );
};

const AddressDropdownOrInput = ({ formik }) => {
  const { t } = useTranslation();
  const AuthStore = useAuthStore();
  const user = AuthStore.user;

  const [showTextAddress, setShowTextAddress] = useState(
    (user && !user.customer.hasAddresses) || !user
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {showTextAddress || !user?.customer.hasAddresses ? (
        <S.Control>
          <Input
            name={"address"}
            placeholder={t("checkout.form.address")}
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </S.Control>
      ) : (
        <AddressDropdown formik={formik} />
      )}
      {user?.customer.hasAddresses && (
        <button
          type={"button"}
          style={{
            color: "rgb(255, 230, 0)",
            fontSize: "10px",
            right: 0,
            top: "calc(100% + 2px)",
            position: "absolute",
            cursor: "pointer",
          }}
          onClick={() => {
            setShowTextAddress((state) => !state);
            if (!showTextAddress) {
              formik.setFieldValue("address_id", null);
            } else {
              formik.setFieldValue("address", "");
            }
          }}
        >
          {showTextAddress
            ? t("checkout.selectSavedAddress")
            : t("checkout.inputAnotherAddress")}
        </button>
      )}
    </div>
  );
};

const AddressDropdown = observer(({ formik }) => {
  const AuthStore = useAuthStore();
  const user = AuthStore.user;

  const options = useMemo(
    () =>
      user?.customer.addresses.map((address) => ({
        label: address.lines,
        value: address.id,
      })),
    [user]
  );

  const initialValue = user.customer.defaultAddress?.id || options[0].value;

  const [value, setValue] = useState<number | string>(
    user.customer.defaultAddress?.id || options[0].value
  );

  useEffect(() => {
    formik.setFieldValue("address_id", initialValue);
  }, []);

  return (
    <S.Control>
      <Dropdown
        options={options}
        width={"350px"}
        value={value}
        onChange={(value) => {
          setValue(value);
          formik.setFieldValue("address_id", value);
        }}
      />
    </S.Control>
  );
});
