import {UIButton} from "../UIButton";
import {ArrowsClockwiseSvg} from "../../svg/ArrowsClockwiseSvg";

export const LoadMoreButton = (
    {
        text,
        ...rest
    }
) => {

    return (
        <UIButton {...rest} text={text}>
            <ArrowsClockwiseSvg/>
        </UIButton>
    );
}