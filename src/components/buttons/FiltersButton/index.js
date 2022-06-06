import {UIButton} from "../UIButton";
import {AdjustersSvg} from "../../svg/AdjustersSvg";
import {forwardRef} from "react";

export const FiltersButton = forwardRef((
    {
        text,
        ...rest
    },
    ref
) => {

    return (
        <UIButton ref={ref} text={text} {...rest}>
            <AdjustersSvg/>
        </UIButton>
    );
})