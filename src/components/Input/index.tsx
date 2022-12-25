import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {AsteriskSvg} from "../svg/AsteriskSvg";
import React, {CSSProperties} from "react";

export type IInputComponentProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  required?: boolean;
  light?: boolean;
  width?: string;
  error?: string | null;
  label?: string;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  style?: CSSProperties;
}

export const Input = (
    {
        placeholder,
        required,
        name,
        light = false,
        width,
        label = "",
        error = null,
        labelStyle = {},
        inputStyle = {},
        style = {},
        ...rest
    }: IInputComponentProps
) => {
    return (
        <S.Wrapper style={style}>
            {label && (
              <p style={{
                fontSize: '15px',
                color: 'rgb(97, 97, 97)',
                marginBottom: '5px',
                ...labelStyle
              }}>{label}</p>
            )}
            <S.Input name={name}
                     width={width}
                     placeholder={placeholder}
                     light={light}
                     style={inputStyle}
                     {...rest}/>
            {required && (
                <S.Asterisk>
                    <SvgIcon width={"10px"} color={"#FFE600"}>
                        <AsteriskSvg/>
                    </SvgIcon>
                </S.Asterisk>
            )}
            {error && (
                <S.Error>
                    {error}
                </S.Error>
            )}
        </S.Wrapper>

    )
}
