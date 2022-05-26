import {UIButton} from "../UIButton";
import {SortOrderSvg} from "../../svg/SortOrderSvg";
import {forwardRef} from "react";

export const SortOrderButton = forwardRef((
    {
        text,
        ...rest
    },
    ref
) => {

    return (
        <UIButton ref={ref} {...rest} text={text}>
            <SortOrderSvg/>
        </UIButton>
    );
})