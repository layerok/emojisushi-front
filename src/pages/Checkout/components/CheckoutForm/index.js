import * as S from "./styled";
import {Switcher} from "../../../../components/Switcher";
import {Input} from "../../../../components/Input";
import {FlexBox} from "../../../../components/FlexBox";
import {ButtonOutline} from "../../../../components/buttons/Button";
import {inject, observer} from "mobx-react";

export const CheckoutFormRaw = (
    {
        PaymentStore,
        ShippingStore,
    }
) => {
    return <S.Form>
        <Switcher name={"deliveryType"} options={ShippingStore.items}/>
        <S.Control>
            <Input name={"name"} placeholder={"Имя"}/>
        </S.Control>
        <S.Control>
            <Input name={"email"} placeholder={"E-mail"}/>
        </S.Control>
        <S.Control>
            <Input name={"phone"} required={true} placeholder={"Телефон"}/>
        </S.Control>
        <S.Control>
            <Input name={"address"} placeholder={"Адрес доставки"}/>
        </S.Control>
        <S.Control>
            <Input name={"comment"} placeholder={"Комментарий к заказу"}/>
        </S.Control>
        <S.Control>
            <Input name={"sticks"} placeholder={"Палочки на сколько персон?"}/>
        </S.Control>
        <S.Control>
            <Input name={"change"} placeholder={"Приготовить сдачу с"}/>
        </S.Control>
        <S.Control>
            <Switcher name={"paymentType"} options={PaymentStore.items}/>
        </S.Control>
        <S.Control>
            <S.ErrorBag>
                Некорректный формат украинского номера
            </S.ErrorBag>
        </S.Control>
        <S.Control>
            <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
                <ButtonOutline width={"160px"}>
                    Заказать
                </ButtonOutline>
                <S.Total>
                    К оплате: 308 ₴
                </S.Total>
            </FlexBox>
        </S.Control>

    </S.Form>;
}

export const CheckoutForm = inject('PaymentStore', 'ShippingStore')(observer(CheckoutFormRaw))