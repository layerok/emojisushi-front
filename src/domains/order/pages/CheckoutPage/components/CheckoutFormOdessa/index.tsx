import {
  FlexBox,
  Input,
  ButtonOutline,
  Switcher,
  Dropdown,
  AuthModal,
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
import Skeleton from "react-loading-skeleton";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";

// todo: logout user if his token is expired
// timer may be solution

type TCheckoutFormProps = {
  loading?: boolean | undefined;
  user?: IUser | undefined;
  cart?: IGetCartRes | undefined;
  shippingMethods?: IGetShippingMethodsRes | undefined;
  paymentMethods?: IGetPaymentMethodsRes | undefined;
  spots?: ISpot[];
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
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const appStore = useAppStore();

    const TakeAwaySchema = Yup.object().shape({
      phone: Yup.string()
        .required(t("validation.required", { field: t("common.phone") }))
        .test(
          "is-possible-phone-number",
          () => t("checkout.form.errors.ua_phone"),
          (value) => {
            const regex =
              /^(((\+)(38)))(([0-9]{3})|(\([0-9]{3}\)))(\-|\s)?(([0-9]{3})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{2})|([0-9]{2})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{3})|([0-9]{2})(\-|\s)?([0-9]{3})(\-|\s)?([0-9]{2}))$/;
            return regex.test(value ?? "");
          }
        ),
      email: Yup.string().email("Invalid email"),
      spot_id: Yup.number().required(t("checkout.form.spot.error")),
    });

    const CourierSchema = Yup.object().shape({
      phone: Yup.string()
        .required(t("validation.required", { field: t("common.phone") }))
        .test(
          "is-possible-phone-number",
          () => t("checkout.form.errors.ua_phone"),
          (value) => {
            const regex =
              /^(((\+)(38)))(([0-9]{3})|(\([0-9]{3}\)))(\-|\s)?(([0-9]{3})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{2})|([0-9]{2})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{3})|([0-9]{2})(\-|\s)?([0-9]{3})(\-|\s)?([0-9]{2}))$/;
            return regex.test(value ?? "");
          }
        ),
      email: Yup.string().email("Invalid email"),
      district_id: Yup.number().required(t("checkout.form.district.error")),
    });

    const [validationSchema, setValidationSchema] = useState<
      typeof TakeAwaySchema | typeof CourierSchema
    >(TakeAwaySchema);

    const wayforpayFormContainer = useRef(null);

    const formik = useFormik({
      initialValues: {
        name: user ? `${user.name} ${user.surname}` : "",
        email: user ? user.email : "",
        phone: user ? user.phone || "" : "",
        address: "",
        address_id: null,
        comment: "",
        sticks: "",
        change: "",
        payment_method_id: 1,
        shipping_method_id: 1,
        spot_id: undefined,
        district_id: undefined,
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const [firstname, lastname] = values.name.split(" ");
        formik.setErrors({});

        const phone = values.phone;
        const email = values.email;

        const address = values.address_id
          ? user.customer.addresses.find(
              (address) => address.id === values.address_id
            ).lines
          : values.address;

        const payment_method_id = +values.payment_method_id;
        const shipping_method_id = +values.shipping_method_id;
        const change = values.change;
        const sticks = +values.sticks;
        const comment = values.comment;

        function getSpotId() {
          if (shippingMethodsSwitcher.selectedMethod().code === "takeaway") {
            return values.spot_id;
          } else {
            const district = appStore.city.districts.find(
              (district) => district.id === values.district_id
            );
            return district.spots[0].id;
          }
        }

        let spot_id = getSpotId();

        setPending(true);

        try {
          // todo: clear cart after you redirected user to thankyou page
          // otherwise user will be redirected to category page
          const res = await orderApi.place({
            phone,
            firstname,
            lastname,
            email,

            address,
            payment_method_id,
            shipping_method_id,
            spot_id,

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
            navigate({
              pathname: "/thankyou",
              search: "?order_id=" + res.data.poster_order.incoming_order_id,
            });
          }
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
        {loading ? (
          <Skeleton height={18} style={{ marginBottom: "20px" }} />
        ) : (
          !user && (
            <FlexBox style={{ marginBottom: "20px" }}>
              {t("checkout.alreadyHaveAccount")}
              <AuthModal redirect_to={location.pathname}>
                <S.Login>{t("common.login")}</S.Login>
              </AuthModal>
            </FlexBox>
          )
        )}
        <S.Form onSubmit={formik.handleSubmit}>
          <Switcher
            loading={loading}
            name={"shipping_method_id"}
            options={shippingMethodsSwitcher.options}
            value={+shippingMethodsSwitcher.selectedMethod()?.id}
            handleChange={({ e, index }) => {
              if (e.target.value === "1") {
                setValidationSchema(TakeAwaySchema);
              } else {
                setValidationSchema(CourierSchema);
              }

              formik.handleChange(e);
            }}
          />

          <S.Control>
            {loading ? (
              <Skeleton height="40px" width="350px" />
            ) : shippingMethodsSwitcher.selectedMethod()?.code ===
              "takeaway" ? (
              <Dropdown
                placeholder={"Оберіть заклад"}
                options={(appStore.city.spots || []).map((spot) => {
                  return {
                    label: spot.name,
                    value: spot.id,
                  };
                })}
                width={"350px"}
                value={formik.values.spot_id}
                onChange={(value) => {
                  formik.setFieldValue("spot_id", value);
                }}
              />
            ) : (
              <Dropdown
                placeholder={t("checkout.form.district.placeholder")}
                options={(appStore.city.districts || []).map((district) => {
                  return {
                    label: district.name,
                    value: district.id,
                  };
                })}
                width={"350px"}
                value={formik.values.district_id}
                onChange={(value) => {
                  formik.setFieldValue("district_id", value);
                }}
              />
            )}
          </S.Control>

          {shippingMethodsSwitcher.selectedMethod()?.code === "courier" && (
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
              name={"email"}
              placeholder={t("common.email")}
              onChange={formik.handleChange}
              value={formik.values.email}
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
              loading={loading}
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
                submitting={pending}
                loading={loading}
                type={"submit"}
                width={"160px"}
              >
                {t("checkout.order")}
              </ButtonOutline>
              {loading ? (
                <Skeleton height={22} width={128} />
              ) : (
                <S.Total>
                  {t("checkout.to_pay")} {cart?.total}
                </S.Total>
              )}
            </FlexBox>
          </S.Control>
        </S.Form>
        <div style={{ display: "none" }} ref={wayforpayFormContainer}></div>
      </S.Container>
    );
  }
);
