import * as S from "./styled";
import {Switcher} from "../../../../components/Switcher";
import {Input} from "../../../../components/Input";
import {FlexBox} from "../../../../components/FlexBox";
import {ButtonOutline} from "../../../../components/buttons/Button";
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import * as Yup from "yup";
import OrderService from "../../../../services/order.service";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export const CheckoutFormRaw = (
    {
        PaymentStore,
        ShippingStore,
        CartStore
    }
) => {
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
            first_name: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
            sticks: '',
            change: '',
            payment_id: '1',
            shipping_id: '1',
        },
        validationSchema: CheckoutSchema,
        onSubmit: values => {
            setPending(true);
            OrderService.place(values).then((res) => {
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
        return ShippingStore.items.find((item) => item.id === +formik.values.shipping_id);
    }


    const getPaymentType = () => {
        return PaymentStore.items.find((item) => item.id === +formik.values.payment_id);
    }



    return <S.Form onSubmit={formik.handleSubmit}>


        <Switcher
            name={"shipping_id"}
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
                name={"first_name"}
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
                name={"payment_id"}
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

export const CheckoutForm = inject('PaymentStore', 'ShippingStore', 'CartStore')(observer(CheckoutFormRaw))