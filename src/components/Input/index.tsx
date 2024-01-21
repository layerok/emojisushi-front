import * as S from "./styled";
import React, { CSSProperties, forwardRef } from "react";
import { If, AsteriskSvg, SvgIcon, SkeletonWrap } from "~components";

export type IInputComponentProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  placeholder?: string;
  required?: boolean;
  light?: boolean;
  width?: string;
  error?: string | null;
  label?: string;
  loading?: boolean;
  labelStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  style?: CSSProperties;
};

export const Input = forwardRef<HTMLInputElement, IInputComponentProps>(
  (props, ref) => {
    const {
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
      loading = false,
      as,
      ...rest
    } = props;
    return (
      <SkeletonWrap
        style={{
          width: "100%",
        }}
        loading={loading}
        borderRadius={10}
      >
        <S.Wrapper style={style}>
          <If condition={!!label}>
            <p
              style={{
                fontSize: "15px",
                color: "rgb(97, 97, 97)",
                marginBottom: "5px",
                ...labelStyle,
              }}
            >
              {label}
            </p>
          </If>
          <S.Input
            name={name}
            width={width}
            placeholder={placeholder}
            light={light}
            style={inputStyle}
            {...rest}
            ref={ref}
          />
          <If condition={required}>
            <S.Asterisk>
              <SvgIcon width={"10px"} color={"#FFE600"}>
                <AsteriskSvg />
              </SvgIcon>
            </S.Asterisk>
          </If>
          <If condition={!!error}>
            <S.Error>{error}</S.Error>
          </If>
        </S.Wrapper>
      </SkeletonWrap>
    );
  }
);
