import * as S from "./styled";
import {cloneElement, forwardRef} from "react";

export const SvgButton = forwardRef(({children},ref) => {
    return (
        <S.Box ref={ref}>

            {cloneElement(children,{ref})}
        </S.Box>
    )
})