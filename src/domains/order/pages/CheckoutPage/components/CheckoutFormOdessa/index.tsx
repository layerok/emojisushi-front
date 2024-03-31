import {
  FlexBox,
  Input,
  SegmentedControl,
  Dropdown,
  SkeletonWrap,
  Trans,
} from "~components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./styled";
import {
  IDistrict,
  IGetCartRes,
  IGetPaymentMethodsRes,
  IGetShippingMethodsRes,
  ISpot,
  IUser,
  PaymentMethodCodeEnum,
  ShippingMethodCodeEnum,
} from "~api/types";
import { ChangeEvent, useRef, useState } from "react";
import { orderApi } from "~api";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { AxiosError } from "axios";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";
import { ModalIDEnum } from "~common/modal.constants";
import { ROUTES } from "~routes";
import { isValidUkrainianPhone, getUserFullName } from "~domains/order/utils";
import { useShowModal } from "~modal";
import { Button } from "~common/ui-components/Button/Button";

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
  spots?: ISpot[];
};

// todo: mark optional fields instead of marking required fields

enum FormNames {
  SpotId = "spot_id",
  DistrictId = "district_id",
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

const getDistrictDefaultSpot = (district: IDistrict) => {
  return district.spots[0];
};

export const CheckoutFormOdessa = observer(
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
    const appStore = useAppStore();
    const showModal = useShowModal();

    const TakeAwaySchema = Yup.object().shape({
      phone: Yup.string()
        // todo: show more user friendly validation errors
        .required(t("validation.required", { field: t("common.phone") }))
        .test(
          "is-possible-phone-number",
          () => t("checkout.form.errors.ua_phone"),
          isValidUkrainianPhone
        ),
      spot_id: Yup.number().required(t("checkout.form.spot.error")),
    });

    const CourierSchema = Yup.object().shape({
      phone: Yup.string()
        .required(t("validation.required", { field: t("common.phone") }))
        .test(
          "is-possible-phone-number",
          () => t("checkout.form.errors.ua_phone"),
          isValidUkrainianPhone
        ),
      district_id: Yup.number().required(t("checkout.form.district.error")),
    });

    const [validationSchema, setValidationSchema] = useState<
      typeof TakeAwaySchema | typeof CourierSchema
    >(TakeAwaySchema);

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
        spot_id,
        district_id,
      } = values;

      const [firstname, lastname] = name.split(" ");

      const resultant_address = address_id
        ? user.customer.addresses.find((address) => address.id === address_id)
            .lines
        : address;

      const district = appStore.city.districts.find(
        (district) => district.id === district_id
      );

      const resultant_spot_id = isTakeawayShipmentMethod
        ? spot_id
        : getDistrictDefaultSpot(district).id;

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

          address: resultant_address,
          payment_method_id: paymentMethod.id,
          shipping_method_id: shippingMethod.id,
          spot_id: resultant_spot_id,

          change,
          sticks: +sticks,
          comment,
        });

        // todo: clear cart after you redirected user to thankyou page
        // otherwise user will be redirected to category page
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
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema,
      onSubmit: handleSubmit,
    });

    const savedAddresses =
      user?.customer.addresses.map((address) => ({
        label: address.lines,
        value: address.id,
      })) || [];

    const [showAddressInput, setShowAddressInput] = useState(true);

    const shippingMethods = (shippingMethodsRes?.data || []).map((item) => ({
      value: item.code,
      // todo: don't use dynamic translation keys
      label: t("shippingMethods." + item.code, item.name),
    }));

    const paymentMethods = (paymentMethodsRes?.data || []).map((item) => ({
      value: item.code,
      // todo: refactor dynamic translations
      label: t("paymentMethods." + item.code, item.name),
    }));

    const formErrors = Object.keys(formik.errors)
      .filter((key) => {
        return formik.touched[key];
      })
      .map((key, i) => {
        return formik.errors[key];
      });

    const openLoginModal = () => {
      showModal(ModalIDEnum.AuthModal, {
        redirect_to: location.pathname,
      });
    };

    const handleShippingMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
      formik.handleChange(e);
      formik.setErrors({});
      formik.setTouched({});
      if (e.target.value === ShippingMethodCodeEnum.Takeaway) {
        setValidationSchema(TakeAwaySchema);
      } else {
        setValidationSchema(CourierSchema);
      }
    };

    const isTakeawayShipmentMethod =
      formik.values.shipping_method_code === ShippingMethodCodeEnum.Takeaway;

    const isCourierShipmentMethod =
      formik.values.shipping_method_code === ShippingMethodCodeEnum.Courier;

    const isCashPaymentMethod =
      formik.values.payment_method_code === PaymentMethodCodeEnum.Cash;

    const takeawayOptions = (appStore.city.spots || []).map((spot) => ({
      label: spot.name,
      value: spot.id,
      disabledText: t("checkout.temporarilyUnavailable"),
      disabled: !user?.is_call_center_admin && spot.temporarily_unavailable,
    }));

    const courierOptions = (appStore.city.districts || []).map((district) => ({
      label: district.name,
      value: district.id,
      disabledText: t("checkout.temporarilyUnavailable"),
      disabled:
        !user?.is_call_center_admin &&
        getDistrictDefaultSpot(district).temporarily_unavailable,
    }));

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

    return (
      <S.Container>
        {!user && (
          <FlexBox style={{ marginBottom: "20px" }}>
            <Trans
              showSkeleton={loading}
              i18nKey={"checkout.alreadyHaveAccount"}
            />
            <S.Login onClick={openLoginModal}>
              <Trans i18nKey={"common.login"} showSkeleton={loading} />
            </S.Login>
          </FlexBox>
        )}
        <S.Form onSubmit={formik.handleSubmit}>
          <SegmentedControl
            showSkeleton={loading}
            name={FormNames.ShippingMethodCode}
            items={shippingMethods}
            value={formik.values.shipping_method_code}
            onChange={handleShippingMethodChange}
          />

          <S.Control>
            {isTakeawayShipmentMethod ? (
              <Dropdown
                showSkeleton={loading}
                placeholder={t("checkout.form.spot.placeholder")}
                options={takeawayOptions}
                width={"350px"}
                value={formik.values[FormNames.SpotId]}
                onChange={(value) => {
                  formik.setFieldValue(FormNames.SpotId, value);
                }}
              />
            ) : (
              <Dropdown
                showSkeleton={loading}
                placeholder={t("checkout.form.district.placeholder")}
                options={courierOptions}
                width={"350px"}
                value={formik.values[FormNames.DistrictId]}
                onChange={(value) => {
                  formik.setFieldValue(FormNames.DistrictId, value);
                }}
              />
            )}
          </S.Control>

          {isCourierShipmentMethod && (
            <S.ButtonContainer>
              {showAddressInput ? (
                <S.Control>
                  <Input
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
                    options={savedAddresses}
                    width={"350px"}
                    value={+formik.values.address_id}
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
              <Button
                loading={formik.isSubmitting}
                showSkeleton={loading}
                type={"submit"}
                style={{
                  width: 160,
                }}
              >
                {t("checkout.order")}
              </Button>

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
