import {UIButton} from "../UIButton";
import {AdjustersSvg} from "../../svg/AdjustersSvg";

export const FiltersButton = (
    {
        text,
        ...rest
    }
) => {

    return (
        <UIButton text={text} {...rest}>
            <AdjustersSvg/>
        </UIButton>
    );
}