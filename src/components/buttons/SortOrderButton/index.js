import {UIButton} from "../UIButton";
import {SortOrderSvg} from "../../svg/SortOrderSvg";

export const SortOrderButton = (
    {
        text,
        ...rest
    }
) => {

    return (
        <UIButton {...rest} text={text}>
            <SortOrderSvg/>
        </UIButton>
    );
}