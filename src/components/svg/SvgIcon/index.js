import * as S from "./styled";
import {forwardRef} from "react";


export const SvgIcon = forwardRef((
    {
        children,
        color="white",
        width,
        height,
        style={},
        ...rest
    },
        ref
) => {
    return (
        <S.Parent style={{
            color,
            width,
            height,
            ...style
        }}
                  ref={ref}
                  {...rest}
        >
            {children}
        </S.Parent>
    )
})