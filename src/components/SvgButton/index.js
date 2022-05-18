import * as S from "./styled";
import {cloneElement, forwardRef} from "react";

export const SvgButton = forwardRef(({children, ...rest}, ref) => {
    return (
        <S.Box {...rest} ref={ref}>
            {cloneElement(children)}
        </S.Box>
    )
})