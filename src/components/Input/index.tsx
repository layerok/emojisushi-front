import * as S from "./styled";
import React, { CSSProperties, forwardRef } from "react";
import { If, AsteriskSvg, SvgIcon } from "~components";
import Skeleton from "react-loading-skeleton";

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
  (
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
      loading = false,
      ...rest
    },
    ref
  ) => {
    if (loading) {
      return <Skeleton height={39.25} width={width} borderRadius={10} />;
    }
    return (
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
          ref={ref}
          name={name}
          width={width}
          placeholder={placeholder}
          light={light}
          style={inputStyle}
          {...rest}
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
    );
  }
);
