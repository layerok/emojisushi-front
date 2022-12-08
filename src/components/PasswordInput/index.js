import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {EyeSvg} from "../svg/EyeSvg";
import {useState} from "react";
import {ClosedEyeSvg} from "../svg/ClosedEyeSvg";
import {Input} from "../Input";

export const PasswordInput = (
    {
        hidden: hiddenPassed = true,
        ...rest
    }
) => {
        const [hidden, setHidden] = useState(hiddenPassed);


    return (

        <S.Wrapper>
            <Input type={hidden ? "password" : "text"}
                   {...rest}/>
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