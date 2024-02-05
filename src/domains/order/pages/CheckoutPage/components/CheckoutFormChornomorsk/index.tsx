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
import { appStore } from "~stores/appStore";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { ROUTES } from "~routes";
import { isValidUkrainianPhone, getUserFullName } from "~domains/order/utils";
import { DeliveryMethodCode } from "~domains/order/constants";

const DEFAULT_PAYMENT_METHOD_ID = 1;
const DEFAULT_DELIVERY_METHOD_ID = 1;

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
  spots?: ISpot[];
};

export const CheckoutFormChernomorsk = observer(
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
      validationSchema: CheckoutSchema,
      onSubmit: async (values, formikHelpers) => {
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
        } = values;
        const [firstname, lastname] = name.split(" ");

        const resultant_address = address_id
          ? user.customer.addresses.find((address) => address.id === address_id)
              .lines
          : address;

        try {
          const res = await orderApi.place({
            phone,
            firstname,
            lastname,
            email: user ? user.email : "",
            spot_id: appStore.city.spots[0].id,

            address: resultant_address,
            payment_method_id: +payment_method_id,
            shipping_method_id: +shipping_method_id,

            change,
            sticks: +sticks,
            comment,
          });

          await queryClient.removeQueries(cartQuery.queryKey);

          if (res.data?.form) {
            wayforpayFormContainer.current.innerHTML = res.data.form;
            wayforpayFormContainer.current.querySelector("form").submit();
          } else {
            navigate(
              ROUTES.THANKYOU.buildPath(
                {},
                {
                  order_id: res.data.poster_order.incoming_order_id + "",
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
                  NiceModal.show(ModalIDEnum.AuthModal, {
                    redirect_to: location.pathname,
                  });
                }}
              >
                <Trans showSkeleton={loading} i18nKey={"common.login"} />
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
              formik.handleChange(e);
            }}
          />
          {shippingMethodsSwitcher.selectedMethod()?.code ===
            DeliveryMethodCode.Courier && (
            <S.ButtonContainer>
              {showAddressInput ? (
                <S.Control>
                  <Input
                    loading={loading}
                    name={"address"}
                    placeholder={t("checkout.form.address")}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </S.Control>
              ) : (
                <S.Control>
                  <Dropdown
                    showSkeleton={loading}
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
              style={{
                width: "100%",
              }}
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
