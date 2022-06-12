import * as S from "./styled";
import {Switcher} from "../../../../components/Switcher";
import {Input} from "../../../../components/Input";
import {FlexBox} from "../../../../components/FlexBox";
import {ButtonOutline} from "../../../../components/buttons/Button";
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";

export const CheckoutFormRaw = (
    {
        PaymentStore,
        ShippingStore,
    }
) => {
    const {t} = useTranslation();
    return <S.Form>
        <Switcher name={"deliveryType"} options={ShippingStore.items}/>
        <S.Control>
            <Input name={"name"} placeholder={t('checkout.form.name')}/>
        </S.Control>
        <S.Control>
            <Input name={"email"} placeholder={t('checkout.form.email')}/>
        </S.Control>
        <S.Control>
            <Input name={"phone"} required={true} placeholder={t('checkout.form.phone')}/>
        </S.Control>
        <S.Control>
            <Input name={"address"} placeholder={t('checkout.form.address')}/>
        </S.Control>
        <S.Control>
            <Input name={"comment"} placeholder={t('checkout.form.comment')}/>
        </S.Control>
        <S.Control>
            <Input name={"sticks"} placeholder={t('checkout.form.sticks')}/>
        </S.Control>
        <S.Control>
            <Input name={"change"} placeholder={t('checkout.form.change')}/>
        </S.Control>
        <S.Control>
            <Switcher name={"paymentType"} options={PaymentStore.items}/>
        </S.Control>
        <S.Control>
            <S.ErrorBag>
                {t('checkout.form.errors.ua_phone')}
            </S.ErrorBag>
        </S.Control>
        <S.Control>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <ButtonOutline width={"160px"}>
                    {t('checkout.order')}
                </ButtonOutline>
                <S.Total>
                    {t('checkout.to_pay')} 308 ₴
                </S.Total>
            </FlexBox>
        </S.Control>

    </S.Form>;
}

export const CheckoutForm = inject('PaymentStore', 'ShippingStore')(observer(CheckoutFormRaw))