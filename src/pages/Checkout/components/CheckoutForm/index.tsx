import * as S from "./styled";
import { Switcher } from "~components/Switcher";
import { Input } from "~components/Input";
import { FlexBox } from "~components/FlexBox";
import { ButtonOutline } from "~components/buttons/Button";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrderApi from "../../../../api/order.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { AuthModal } from "~components/modals/AuthModal";
import { usePaymentStore } from "~hooks/use-payment-store";
import { useShippingStore } from "~hooks/use-shipping-store";
import { useCartStore } from "~hooks/use-cart-store";
import { useAuthStore } from "~hooks/use-auth-store";
import { Dropdown } from "~components/Dropdown";
import { useSpot } from "~hooks";

// todo: logout user if his token is expired
// timer may be solution

export const CheckoutForm = observer(() => {
  const PaymentStore = usePaymentStore();
  const ShippingStore = useShippingStore();
  const CartStore = useCartStore();
  const AuthStore = useAuthStore();

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
          if (res.data?.success) {
            CartStore.fetchItems();
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

  const getShippingType = () => {
    return ShippingStore.items.find(
      (item) => item.id === +formik.values.shipping_method_id
    );
  };

  const getPaymentType = () => {
    return PaymentStore.items.find(
      (item) => item.id === +formik.values.payment_method_id
    );
  };

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

      <Switcher
        name={"shipping_method_id"}
        options={ShippingStore.items.map((item) => ({
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

      <S.Control>
        <Switcher
          name={"payment_method_id"}
          options={PaymentStore.items.map((item) => ({
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
            {t("checkout.to_pay")} {CartStore.total}
          </S.Total>
        </FlexBox>
      </S.Control>
    </S.Form>
  );
});

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
