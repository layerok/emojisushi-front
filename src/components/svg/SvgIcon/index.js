import * as S from "./styled";
import {forwardRef} from "react";


export const SvgIcon = forwardRef((
    {
        children,
        color,
        hoverColor,
        width,
        height,
        style={},
        ...rest
    },
        ref
) => {
    return (
        <S.Parent style={{
            width,
            height,
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