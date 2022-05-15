import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {AsteriskSvg} from "../svg/AsteriskSvg";

export const Input = (
    {
        placeholder,
        required,
        name,
        ...rest
    }
) => {
    return (
        <S.Wrapper>
            <S.Input name={name} placeholder={placeholder} {...rest}/>
            {required && (
                <S.Asterisk>
                    <SvgIcon width={"10px"} color={"#FFE600"}>
                        <AsteriskSvg/>
                    </SvgIcon>
                </S.Asterisk>
            )}
        </S.Wrapper>

    )
}