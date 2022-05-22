import * as S from "./styled";
import {NestedPopover} from "../NestedPopover";
import {ButtonFilled, ButtonOutline} from "../../buttons/Button";
import {FlexBox} from "../../FlexBox";

export const ConfirmActionPopover = (
    {
        text,
        onConfirm,
        onCancel,
        children
    }
) => {
    return <NestedPopover render={({close}) => (<S.Wrapper>
        {text}
        <FlexBox style={{marginTop: "20px"}} justifyContent={"space-between"}>
            <ButtonOutline onClick={() => onConfirm({close})} width={"162px"}>Да</ButtonOutline>
            <ButtonFilled onClick={() => onCancel({close})} width={"162px"}>Нет</ButtonFilled>
        </FlexBox>

    </S.Wrapper>)}>
        {children}
    </NestedPopover>

}