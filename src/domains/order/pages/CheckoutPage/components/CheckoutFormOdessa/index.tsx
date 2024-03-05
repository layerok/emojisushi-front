import {
  FlexBox,
  Input,
  ButtonOutline,
  Switcher,
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
} from "~api/types";
import { useRef, useState } from "react";
import { orderApi } from "~api";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { AxiosError } from "axios";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";
import { ModalIDEnum } from "~common/modal.constants";
import { ROUTES } from "~routes";
import { isValidUkrainianPhone, getUserFullName } from "~domains/order/utils";
import { DeliveryMethodCode } from "~domains/order/constants";
import { useShowModal } from "~modal";

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
  spots?: ISpot[];
};

// todo: show validation errors when a field is touched or the submit button is clicked
// instead of showing all validations errors immediately

// todo: mark optional fields instead of marking required fields

enum ShippingMethodIdEnum {
  Takeaway = 1,
  Courier = 2,
}

enum FormNames {
  SpotId = "spot_id",
  DistrictId = "district_id",
}

const DEFAULT_PAYMENT_METHOD_ID = 1;
const DEFAULT_DELIVERY_METHOD_ID = 1;

const getDistrictDefaultSpot = (district: IDistrict) => {
  return district.spots[0];
};

export const CheckoutFormOdessa = observer(
  ({
    cart,
    shippingMethods,
    paymentMethods,
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

    const formik = useFormik({
      initialValues: {
        name: user ? getUserFullName(user) : "",
        phone: user ? user.phone || "" : "",
        address: "",
        address_id: null,
        comment: "",
        sticks: "",
        change: "",
        payment_method_id: DEFAULT_PAYMENT_METHOD_ID,
        shipping_method_id: DEFAULT_DELIVERY_METHOD_ID,
        spot_id: undefined,
        district_id: undefined,
      },
      validationSchema,
      onSubmit: async (values) => {
        formik.setErrors({});

        const {
          phone,
          name,
          address_id,
          address,
          payment_method_id,
          shipping_method_id,
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

        function getSpotId() {
          if (
            shippingMethodsSwitcher.selectedMethod().code ===
            DeliveryMethodCode.Takeaway
          ) {
            return spot_id;
          } else {
            const district = appStore.city.districts.find(
              (district) => district.id === district_id
            );
            return getDistrictDefaultSpot(district).id;
          }
        }

        try {
          const res = await orderApi.place({
            phone,
            firstname,
            lastname,
            email: user ? user.email : "",

            address: resultant_address,
            payment_method_id: +payment_method_id,
            shipping_method_id: +shipping_method_id,
            spot_id: getSpotId(),

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
      },
    });

    const addressDropdown = {
      options: user?.customer.addresses.map((address) => ({
        label: address.lines,
        value: address.id,
      })),
      selectedAddress: (user?.customer.addresses || []).find(
        (item) => item.id === +formik.values.address_id
      ),
    };

    const [showAddressInput, setShowAddressInput] = useState(true);

    const shippingMethodsSwitcher = {
      options: (shippingMethods?.data || []).map((item) => ({
        value: item.id,
        // todo: don't use dynamic translation keys
        label: t("shippingMethods." + item.code, item.name),
      })),
      selectedMethod: () =>
        (shippingMethods?.data || []).find(
          (item) => item.id === +formik.values.shipping_method_id
        ),
    };

    const paymentMethodsSwitcher = {
      options: (paymentMethods?.data || []).map((item) => ({
        value: item.id,
        // todo: refactor dynamic translations
        label: t("paymentMethods." + item.code, item.name),
      })),
      selectedMethod: () =>
        loading
          ? null
          : (paymentMethods?.data || []).find(
              (item) => item.id === +formik.values.payment_method_id
            ),
    };

    return (
      <S.Container>
        {!user && (
          <div style={{ marginBottom: "20px" }}>
            <FlexBox>
              <Trans
                showSkeleton={loading}
                i18nKey={"checkout.alreadyHaveAccount"}
              />
              <S.Login
                onClick={() => {
                  showModal(ModalIDEnum.AuthModal, {
                    redirect_to: location.pathname,
                  });
                }}
              >
                <Trans i18nKey={"common.login"} showSkeleton={loading} />
              </S.Login>
            </FlexBox>
          </div>
        )}
        <S.Form onSubmit={formik.handleSubmit}>
          <Switcher
            showSkeleton={loading}
            name={"shipping_method_id"}
            options={shippingMethodsSwitcher.options}
            value={+shippingMethodsSwitcher.selectedMethod()?.id}
            handleChange={({ e, index }) => {
              if (e.target.value === String(ShippingMethodIdEnum.Takeaway)) {
                setValidationSchema(TakeAwaySchema);
              } else {
                setValidationSchema(CourierSchema);
              }

              formik.handleChange(e);
            }}
          />

          <S.Control>
            {shippingMethodsSwitcher.selectedMethod()?.code ===
            DeliveryMethodCode.Takeaway ? (
              <Dropdown
                showSkeleton={loading}
                placeholder={t("checkout.form.spot.placeholder")}
                options={(appStore.city.spots || []).map((spot) => ({
                  label: spot.name,
                  value: spot.id,
                  disabledText: t("checkout.temporarilyUnavailable"),
                  disabled:
                    !user?.is_call_center_admin && spot.temporarily_unavailable,
                }))}
                width={"350px"}
                value={formik.values[FormNames.SpotId]}
                onChange={(value) =>
                  formik.setFieldValue(FormNames.SpotId, value)
                }
              />
            ) : (
              <Dropdown
                showSkeleton={loading}
                placeholder={t("checkout.form.district.placeholder")}
                options={(appStore.city.districts || []).map((district) => ({
                  label: district.name,
                  value: district.id,
                  disabledText: t("checkout.temporarilyUnavailable"),
                  disabled:
                    !user?.is_call_center_admin &&
                    getDistrictDefaultSpot(district).temporarily_unavailable,
                }))}
                width={"350px"}
                value={formik.values[FormNames.DistrictId]}
                onChange={(value) => {
                  formik.setFieldValue(FormNames.DistrictId, value);
                }}
              />
            )}
          </S.Control>

          {shippingMethodsSwitcher.selectedMethod()?.code ===
            DeliveryMethodCode.Courier && (
            <S.ButtonContainer>
              {showAddressInput ? (
                <S.Control>
                  <Input
                    name={"address"}
                    placeholder={t("checkout.form.address")}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </S.Control>
              ) : (
                <S.Control>
                  <Dropdown
                    options={addressDropdown.options}
                    width={"350px"}
                    value={addressDropdown.selectedAddress?.id}
                    onChange={(id) => {
                      formik.setFieldValue("address_id", id);
                    }}
                  />
                </S.Control>
              )}
              {user && !!user?.customer.addresses.length && (
                <S.Button
                  type={"button"}
                  onClick={() => {
                    if (showAddressInput) {
                      const defaultAddress = user.customer.addresses.find(
                        (address) =>
                          address.id ===
                          user.customer.default_shipping_address_id
                      );

                      if (defaultAddress) {
                        formik.setFieldValue("address_id", defaultAddress.id);
                      } else {
                        formik.setFieldValue(
                          "address_id",
                          user.customer.addresses[0].id
                        );
                      }
                    } else {
                      formik.setFieldValue("address_id", null);
                    }
                    setShowAddressInput((state) => !state);
                  }}
                >
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
              name={"name"}
              placeholder={t("common.first_name")}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </S.Control>

          <S.Control>
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
          </S.Control>
          <S.Control>
            <Input
              loading={loading}
              name={"sticks"}
              type={"number"}
              min={"0"}
              placeholder={t("checkout.form.persons")}
              onChange={formik.handleChange}
              value={formik.values.sticks}
            />
          </S.Control>
          <S.Control>
            <Input
              loading={loading}
              name={"comment"}
              placeholder={t("checkout.form.comment")}
              onChange={formik.handleChange}
              value={formik.values.comment}
            />
          </S.Control>
          <S.Control>
            <Switcher
              showSkeleton={loading}
              name={"payment_method_id"}
              options={paymentMethodsSwitcher.options}
              handleChange={({ e, index }) => {
                formik.handleChange(e);
              }}
              value={paymentMethodsSwitcher.selectedMethod()?.id}
            />
          </S.Control>
          {paymentMethodsSwitcher.selectedMethod()?.code === "cash" && (
            <S.Control>
              <Input
                loading={loading}
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
