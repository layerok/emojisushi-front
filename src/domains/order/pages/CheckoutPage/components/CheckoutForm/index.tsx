import * as S from "./styled";
import { FlexBox, Input, ButtonOutline } from "~components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { orderApi } from "~api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSpot } from "~hooks";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { CartProduct, User } from "~models";
import { ShippingMethods } from "./components/ShippingMethods";
import { PaymentMethods } from "./components/PaymentMethods";
import { Login } from "./components/Login";
import { Total } from "./components/Total";
import * as SharedStyles from "./shared/styled";
import {
  IGetCartRes,
  IGetPaymentMethodsRes,
  IGetShippingMethodsRes,
  IUser,
} from "~api/types";

// todo: logout user if his token is expired
// timer may be solution

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
};

export const CheckoutForm = ({
  cart,
  shippingMethods,
  paymentMethods,
  user: userJson,
  loading = false,
}: TCheckoutFormProps) => {
  const user = userJson ? new User(userJson) : null;

  const items = loading ? [] : cart.data.map((json) => new CartProduct(json));

  const optimisticCartTotal = useOptimisticCartTotalPrice({
    items: items,
  });

  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

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
      orderApi
        .place({
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
      <Login user={user} loading={loading} />

      <ShippingMethods
        user={user}
        loading={loading}
        items={shippingMethods?.data || []}
        formik={formik}
      />

      <SharedStyles.Control>
        <Input
          loading={loading}
          name={"name"}
          placeholder={t("common.first_name")}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
      </SharedStyles.Control>

      {!user && (
        <SharedStyles.Control>
          <Input
            loading={loading}
            name={"email"}
            placeholder={t("common.email")}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </SharedStyles.Control>
      )}
      <SharedStyles.Control>
        <Input
          loading={loading}
          name={"phone"}
          required={true}
          placeholder={t("common.phone")}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          value={formik.values.phone}
        />
      </SharedStyles.Control>
      <SharedStyles.Control>
        <Input
          loading={loading}
          name={"sticks"}
          type={"number"}
          min={"0"}
          placeholder={t("checkout.form.sticks")}
          onChange={formik.handleChange}
          value={formik.values.sticks}
        />
      </SharedStyles.Control>
      <SharedStyles.Control>
        <Input
          loading={loading}
          name={"comment"}
          placeholder={t("checkout.form.comment")}
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
      </SharedStyles.Control>

      <PaymentMethods
        loading={loading}
        items={paymentMethods?.data || []}
        formik={formik}
      />

      {Object.keys(formik.errors).length > 0 && (
        <SharedStyles.Control>
          <S.ErrorBag>
            {Object.keys(formik.errors).map((key, i) => (
              <li key={key}>{formik.errors[key]}</li>
            ))}
          </S.ErrorBag>
        </SharedStyles.Control>
      )}

      <SharedStyles.Control>
        <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
          <ButtonOutline
            submitting={pending}
            loading={loading}
            type={"submit"}
            width={"160px"}
          >
            {t("checkout.order")}
          </ButtonOutline>
          <Total loading={loading} total={optimisticCartTotal} />
        </FlexBox>
      </SharedStyles.Control>
    </S.Form>
  );
};
