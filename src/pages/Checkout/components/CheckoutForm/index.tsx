import * as S from "./styled";
import {Switcher} from "~components/Switcher";
import {Input} from "~components/Input";
import {FlexBox} from "~components/FlexBox";
import {ButtonOutline} from "~components/buttons/Button";
import { observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import * as Yup from "yup";
import OrderApi from "../../../../api/order.api";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {AuthModal} from "~components/modals/AuthModal";
import {usePaymentStore} from "~hooks/use-payment-store";
import {useShippingStore} from "~hooks/use-shipping-store";
import {useCartStore} from "~hooks/use-cart-store";
import {useAuthStore} from "~hooks/use-auth-store";
import {useSpotsStore} from "~hooks/use-spots-store";

export const CheckoutFormRaw = () => {
    const PaymentStore = usePaymentStore();
    const ShippingStore = useShippingStore();
    const CartStore = useCartStore();
    const AuthStore = useAuthStore();
    const SpotsStore = useSpotsStore();
    const {t} = useTranslation();
    const [pending, setPending] = useState(false);
    const navigate = useNavigate();
    const CheckoutSchema = Yup.object().shape({
        phone: Yup.string()
          .required(t('validation.required', {field: t('checkout.form.phone')})).test(
            'is-possible-phone-number',
            () => t('checkout.form.errors.ua_phone'),
            (value) => {
                const regex = /^(((\+?)(38))\s?)?(([0-9]{3})|(\([0-9]{3}\)))(\-|\s)?(([0-9]{3})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{2})|([0-9]{2})(\-|\s)?([0-9]{2})(\-|\s)?([0-9]{3})|([0-9]{2})(\-|\s)?([0-9]{3})(\-|\s)?([0-9]{2}))$/;
                return regex.test(value ?? '');
            }
          ),
        email: Yup.string().email('Invalid email'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
            sticks: 0,
            change: '',
            payment_method_id: 1,
            shipping_method_id: 1,
        },
        validationSchema: CheckoutSchema,
        onSubmit: values => {
            setPending(true);
            const [firstname, lastname] = values.name.split(' ');
            OrderApi.place({
                phone: values.phone,
                firstname: firstname || 'Гість',
                lastname: lastname || '#' + Date.now(),

                email: values.email || 'guest' + Date.now() + '@guest.com', // на жаль в поточній реліазації бєкунду, емейл це обов'язкове поле, тому ми і встановлюему "тупе" значення, в разі якщо юзер не вказав його

                address: values.address || SpotsStore.getSelected.address,
                payment_method_id: values.payment_method_id,
                shipping_method_id: values.shipping_method_id,

                poster_firstname: firstname,
                poster_lastname: lastname,
                poster_email: values.email,

                country_code: 'UA',
                zip: '65125',
                city: 'Одеса',

                change: values.change,
                sticks: values.sticks,
                comment: values.comment,

            }).then((res) => {
                if(res.data?.success) {
                    navigate('/thankyou');
                }
                setPending(false);
            }).catch((e) => {
                if(e.response.data?.errors) {
                    formik.setErrors(e.response.data.errors);
                }
                setPending(false);
            })
        },
    })

    const getShippingType = () => {
        return ShippingStore.items.find((item) => item.id === +formik.values.shipping_method_id);
    }


    const getPaymentType = () => {
        return PaymentStore.items.find((item) => item.id === +formik.values.payment_method_id);
    }



    return <S.Form onSubmit={formik.handleSubmit}>
        {!AuthStore.isAuthorized && (
          <FlexBox style={{marginBottom: "20px"}}>
              Уже есть аккаунт?
              <AuthModal>
                  <S.SignIn>
                      Войти
                  </S.SignIn>
              </AuthModal>
          </FlexBox>
        )}


        <Switcher
          name={"shipping_method_id"}
          options={ShippingStore.items}
          selected={(option) => {
              return option.id === getShippingType().id}
          }
          handleChange={({e, index}) => {
              formik.handleChange(e);
          }}
        />

        {getShippingType()?.id === 2 && (
          <S.Control>
              <Input
                name={"address"}
                placeholder={t('checkout.form.address')}
                onChange={formik.handleChange}
                value={formik.values.address}
              />
          </S.Control>
        )}
        <S.Control>
            <Input
              name={"name"}
              placeholder={t('checkout.form.first_name')}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
        </S.Control>

        <S.Control>
            <Input
              name={"email"}
              placeholder={t('checkout.form.email')}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
        </S.Control>
        <S.Control>
            <Input
              name={"phone"}
              required={true}
              placeholder={t('checkout.form.phone')}
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
              placeholder={t('checkout.form.sticks')}
              onChange={formik.handleChange}
              value={formik.values.sticks}
            />
        </S.Control>
        <S.Control>
            <Input
              name={"comment"}
              placeholder={t('checkout.form.comment')}
              onChange={formik.handleChange}
              value={formik.values.comment}
            />
        </S.Control>

        <S.Control>
            <Switcher
              name={"payment_method_id"}
              options={PaymentStore.items}
              handleChange={({e, index}) => {
                  formik.handleChange(e);
              }}
              selected={(option) => option.id === getPaymentType().id}
            />
        </S.Control>
        {getPaymentType()?.code === "cash" && (
          <S.Control>
              <Input
                name={"change"}
                placeholder={t('checkout.form.change')}
                onChange={formik.handleChange}
                value={formik.values.change}
              />
          </S.Control>
        )}
        {(Object.keys(formik.errors).length > 0 ) && (
          <S.Control>
              <S.ErrorBag>
                  {Object.keys(formik.errors).map((key, i) => (
                    <li key={key}>
                        {formik.errors[key]}
                    </li>
                  ))}
              </S.ErrorBag>
          </S.Control>
        )}

        <S.Control>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <ButtonOutline loading={pending} type={"submit"} width={"160px"}>
                    {t('checkout.order')}
                </ButtonOutline>
                <S.Total>
                    {t('checkout.to_pay')} {CartStore.total}
                </S.Total>
            </FlexBox>
        </S.Control>

    </S.Form>;
}

export const CheckoutForm = observer(CheckoutFormRaw)
