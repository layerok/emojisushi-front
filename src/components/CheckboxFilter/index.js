import * as S from "./styled";
import {FlexBox} from "../FlexBox";
import {useId} from "react";


export const CheckboxFilter = ({children}) => {
    const id = useId()
    return (
        <FlexBox>
                <S.CheckBoxWrapper>
                    <S.CheckBox id={id} type="checkbox"/>
                    <S.Label htmlFor={id}>
                        {children}
                    </S.Label>
                </S.CheckBoxWrapper>
        </FlexBox>
    )
}