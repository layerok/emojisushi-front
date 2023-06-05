import * as S from "./styled";
import { FlexBox, Input, ButtonOutline } from "~components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams, useRevalidator } from "react-router-dom";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { CartProduct } from "~models";
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
import { useState } from "react";
import { orderApi } from "~api";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { AxiosError } from "axios";

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
  user,
  loading = false,
}: TCheckoutFormProps) => {
  const items = loading ? [] : cart.data.map((json) => new CartProduct(json));

  const optimisticCartTotal = useOptimisticCartTotalPrice({
    items: items,
  });

  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const { lang, citySlug, spotSlug } = useParams();
  const navigate = useNavigate();

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

  const revalidator = useRevalidator();

  const formik = useFormik({
    initialValues: {
      name: user ? `${user.name} ${user.surname}` : "",
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
    onSubmit: async (values) => {
      const [firstname, lastname] = values.name.split(" ");
      formik.setErrors({});

      const phone = values.phone;
      const email = values.email;
      const spot_id_or_slug = spotSlug;
      const address = values.address;
      const address_id = values.address_id;
      const payment_method_id = +values.payment_method_id;
      const shipping_method_id = +values.shipping_method_id;
      const change = values.change;
      const sticks = +values.sticks;
      const comment = values.comment;

      setPending(true);

      try {
        await orderApi.place({
          phone,
          firstname,
          lastname,
          email,
          spot_id_or_slug,

          address,
          address_id,
          payment_method_id,
          shipping_method_id,

          change,
          sticks: +sticks,
          comment,
        });

        await queryClient.removeQueries(cartQuery.queryKey);
        revalidator.revalidate();
        navigate("/" + [lang, citySlug, spotSlug, "thankyou"].join("/"));
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data?.errors) {
            formik.setErrors(e.response.data.errors);
          }
        }
      } finally {
        setPending(false);
      }
    },
  });

  return (
    <S.Container>
      <Login user={user} loading={loading} />
      <S.Form onSubmit={formik.handleSubmit}>
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
    </S.Container>
  );
};
