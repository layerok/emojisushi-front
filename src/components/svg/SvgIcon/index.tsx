import * as S from "./styled";
import {CSSProperties, forwardRef, HTMLProps, PropsWithChildren} from "react";

type IProps = HTMLProps<HTMLSpanElement> & PropsWithChildren<{
  color?: string;
  hoverColor?: string;
  width?: string;
  height?: string;
  clickable?: boolean;
  style?: CSSProperties
}>

export const SvgIcon = forwardRef((
    {
        children,
        color,
        hoverColor,
        width,
        height,
      clickable = false,
        style={},
        ...rest
    }: IProps,
        ref
) => {
    return (
        <S.Parent style={{
            width,
            height,
            cursor: clickable ? 'pointer': 'default',
            ...style
        }}
                  ref={ref}
                  noDomColor={color}
                  hoverColor={hoverColor}
                  {...rest}
        >
            {children}
        </S.Parent>
    )
})
