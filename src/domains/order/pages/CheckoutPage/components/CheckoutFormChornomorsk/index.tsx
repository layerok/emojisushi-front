import {
  ButtonOutline,
  Dropdown,
  FlexBox,
  Input,
  SegmentedControl,
  SkeletonWrap,
  Trans,
} from "~components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styled";
import {
  IGetCartRes,
  IGetPaymentMethodsRes,
  IGetShippingMethodsRes,
  ISpot,
  IUser,
  PaymentMethodCodeEnum,
  ShippingMethodCodeEnum,
} from "~api/types";
import { useRef, useState } from "react";
import { orderApi } from "~api";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { AxiosError } from "axios";
import { observer } from "mobx-react";
import { appStore } from "~stores/appStore";
import { ModalIDEnum } from "~common/modal.constants";
import { ROUTES } from "~routes";
import { getUserFullName, isValidUkrainianPhone } from "~domains/order/utils";
import { useShowModal } from "~modal";

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
  spots?: ISpot[];
};

enum FormNames {
  ShippingMethodCode = "shipping_method_code",
  PaymentMethodCode = "payment_method_code",
  Change = "change",
  Address = "address",
  AddressId = "address_id",
  Name = "name",
  Phone = "phone",
  Sticks = "sticks",
  Comment = "comment",
}

export const CheckoutFormChernomorsk = observer(
  ({
    cart,
    shippingMethods: shippingMethodsRes,
    paymentMethods: paymentMethodsRes,
    user,
    spots,
    loading = false,
  }: TCheckoutFormProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const showModal = useShowModal();

    const CheckoutSchema = Yup.object().shape({
      phone: Yup.string()
        .required(t("validation.required", { field: t("common.phone") }))
        .test(
          "is-possible-phone-number",
          () => t("checkout.form.errors.ua_phone"),
          isValidUkrainianPhone
        ),
    });

    const wayforpayFormContainer = useRef(null);

    const initialValues = {
      name: user && !user.is_call_center_admin ? getUserFullName(user) : "",
      phone: user && !user.is_call_center_admin ? user.phone || "" : "",
      address: "",
      address_id: null,
      comment: "",
      sticks: "",
      change: "",
      payment_method_code: PaymentMethodCodeEnum.Cash,
      shipping_method_code: ShippingMethodCodeEnum.Takeaway,
      spot_id: undefined,
      district_id: undefined,
    };

    const handleSubmit = async (values: typeof initialValues) => {
      formik.setErrors({});
      const {
        phone,
        name,
        address_id,
        address,
        payment_method_code,
        shipping_method_code,
        change,
        comment,
        sticks,
      } = values;
      const [firstname, lastname] = name.split(" ");

      const resultant_address = address_id
        ? user.customer.addresses.find((address) => address.id === address_id)
            .lines
        : address;

      const paymentMethod = paymentMethodsRes.data.find(
        (method) => method.code === payment_method_code
      );
      const shippingMethod = shippingMethodsRes.data.find(
        (method) => method.code === shipping_method_code
      );

      try {
        const res = await orderApi.place({
          phone,
          firstname,
          lastname,
          email: user ? user.email : "",
          spot_id: appStore.city.spots[0].id,

          address: resultant_address,
          payment_method_id: paymentMethod.id,
          shipping_method_id: shippingMethod.id,

          change,
          sticks: +sticks,
          comment,
        });

        await queryClient.removeQueries(cartQuery.queryKey);

        if (res.data?.form) {
          wayforpayFormContainer.current.innerHTML = res.data.form;
          wayforpayFormContainer.current.querySelector("form").submit();
        } else {
          const order_id = res.data?.poster_order?.incoming_order_id;
          navigate(
            ROUTES.THANKYOU.buildPath(
              {},
              {
                order_id: !!order_id ? `${order_id}` : "",
              }
            )
          );
        }
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.data?.errors) {
            formik.setErrors(e.response.data.errors);
          }
        }
      }
    };

    const formik = useFormik<typeof initialValues>({
      initialValues,
      validationSchema: CheckoutSchema,
      validateOnBlur: true,
      validateOnChange: true,
      onSubmit: handleSubmit,
    });

    const savedAddresses =
      user?.customer.addresses.map((address) => ({
        label: address.lines,
        value: address.id,
      })) || [];

    const [showAddressInput, setShowAddressInput] = useState(true);

    const shippingMethods = (shippingMethodsRes?.data || []).map((item) => ({
      value: item.id,
      // todo: refactor dynamic translation keys
      label: t("shippingMethods." + item.code, item.name),
    }));

    const paymentMethods = (paymentMethodsRes?.data || []).map((item) => ({
      value: item.id,
      // todo: refactor dynamic translation keys
      label: t("paymentMethods." + item.code, item.name),
    }));

    const isCashPaymentMethod =
      formik.values.payment_method_code === PaymentMethodCodeEnum.Cash;

    const isCourierShippingMethod =
      formik.values.shipping_method_code === ShippingMethodCodeEnum.Courier;

    const formErrors = Object.keys(formik.errors)
      .filter((key) => {
        return formik.touched[key];
      })
      .map((key, i) => {
        return formik.errors[key];
      });

    const showSavedAddresses = () => {
      if (showAddressInput) {
        const defaultAddress = user.customer.addresses.find(
          (address) => address.id === user.customer.default_shipping_address_id
        );

        if (defaultAddress) {
          formik.setFieldValue(FormNames.AddressId, defaultAddress.id);
        } else {
          formik.setFieldValue(
            FormNames.AddressId,
            user.customer.addresses[0].id
          );
        }
      } else {
        formik.setFieldValue(FormNames.AddressId, null);
      }
      setShowAddressInput((state) => !state);
    };

    const goToLogin = () => {
      showModal(ModalIDEnum.AuthModal, {
        redirect_to: location.pathname,
      });
    };

    return (
      <S.Container>
        {!user && (
          <FlexBox style={{ marginBottom: "20px" }}>
            <Trans
              showSkeleton={loading}
              i18nKey={"checkout.alreadyHaveAccount"}
            />
            <S.Login onClick={goToLogin}>
              <Trans showSkeleton={loading} i18nKey={"common.login"} />
            </S.Login>
          </FlexBox>
        )}
        <S.Form onSubmit={formik.handleSubmit}>
          <SegmentedControl
            showSkeleton={loading}
            name={FormNames.ShippingMethodCode}
            items={shippingMethods}
            value={formik.values.shipping_method_code}
            onChange={formik.handleChange}
          />
          {isCourierShippingMethod && (
            <S.ButtonContainer>
              {showAddressInput ? (
                <S.Control>
                  <Input
                    loading={loading}
                    name={FormNames.Address}
                    placeholder={t("checkout.form.address")}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                  />
                </S.Control>
              ) : (
                <S.Control>
                  <Dropdown
                    showSkeleton={loading}
                    options={savedAddresses}
                    width={"350px"}
                    value={formik.values.address_id}
                    onChange={(id) => {
                      formik.setFieldValue(FormNames.AddressId, id);
                    }}
                  />
                </S.Control>
              )}
              {!!savedAddresses.length && (
                <S.Button type={"button"} onClick={showSavedAddresses}>
                  {showAddressInput
                    ? t("checkout.selectSavedAddress")
                    : t("checkout.inputAnotherAddress")}
                </S.Button>
              )}
            </S.ButtonContainer>
          )}

          <S.Control>
            <Input
              loading={loading}
              name={FormNames.Name}
              placeholder={t("common.first_name")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </S.Control>

          <S.Control>
            <Input
              loading={loading}
              name={FormNames.Phone}
              required={true}
              placeholder={t("common.phone")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
          </S.Control>
          <S.Control>
            <Input
              loading={loading}
              name={FormNames.Sticks}
              type={"number"}
              min={"0"}
              placeholder={t("checkout.form.persons")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sticks}
            />
          </S.Control>
          <S.Control>
            <Input
              loading={loading}
              name={FormNames.Comment}
              placeholder={t("checkout.form.comment")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.comment}
            />
          </S.Control>
          <S.Control>
            <SegmentedControl
              showSkeleton={loading}
              style={{
                width: "100%",
              }}
              name={FormNames.PaymentMethodCode}
              items={paymentMethods}
              onChange={formik.handleChange}
              value={formik.values.payment_method_code}
            />
          </S.Control>
          {isCashPaymentMethod && (
            <S.Control>
              <Input
                loading={loading}
                name={FormNames.Change}
                placeholder={t("checkout.form.change")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.change}
              />
            </S.Control>
          )}

          {formErrors.length > 0 && (
            <S.Control>
              <S.ErrorBag>
                {formErrors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </S.ErrorBag>
            </S.Control>
          )}

          <S.Control>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
              <ButtonOutline
                submitting={formik.isSubmitting}
                loading={loading}
                type={"submit"}
                width={"160px"}
              >
                {t("checkout.order")}
              </ButtonOutline>

              <S.Total>
                <Trans showSkeleton={loading} i18nKey={"checkout.to_pay"} />
                &nbsp;
                <SkeletonWrap loading={loading}>
                  {cart?.total ? cart.total : "🤪🤪🤪"}
                </SkeletonWrap>
              </S.Total>
            </FlexBox>
          </S.Control>
        </S.Form>
        <div style={{ display: "none" }} ref={wayforpayFormContainer}></div>
      </S.Container>
    );
  }
);
