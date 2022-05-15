import * as S from "./styled";
import {Switcher} from "../../../../components/Switcher";
import {deliveryTypes} from "../../../../common/mock/data/deliveryTypes";

export const CheckoutForm = () => {
    return <S.Form>
        <Switcher name={"deliveryType"} options={deliveryTypes}/>
    </S.Form>;
}