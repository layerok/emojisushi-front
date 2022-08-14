import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {EyeSvg} from "../svg/EyeSvg";
import {useState} from "react";
import {ClosedEyeSvg} from "../svg/ClosedEyeSvg";

export const PasswordInput = () => {
        const [hidden, setHidden] = useState(true);


    return (

        <S.Wrapper>
            <S.Input type={hidden ? "password" : "text"}/>
            <S.Eye onClick={() => {setHidden( !hidden )}}>
                <SvgIcon width="20px">
                    {hidden && (
                        <ClosedEyeSvg/>
                    )}
                    {!hidden && (
                        <EyeSvg/>
                    )}


                </SvgIcon>
            </S.Eye>
        </S.Wrapper>

    )
}