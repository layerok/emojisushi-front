import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {EyeSvg} from "../svg/EyeSvg";
import {useState} from "react";
import {ClosedEyeSvg} from "../svg/ClosedEyeSvg";
import {IInputComponentProps, Input} from "../Input";

type IProps = IInputComponentProps & {
  name: string;
  hidden?: boolean;
}

export const PasswordInput = (
    {
        hidden: hiddenPassed = true,
        name,
        ...rest
    }: IProps
) => {
        const [hidden, setHidden] = useState(hiddenPassed);


    return (

        <S.Wrapper>
            <Input name={name} type={hidden ? "password" : "text"}
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
