import * as S from "./styled";
import {cloneElement, forwardRef} from "react";

export const SvgButton = forwardRef(({children, ...rest}, ref) => {
    return (
        <S.Box ref={ref} {...rest}>
            {cloneElement(children)}
        </S.Box>
    )
})