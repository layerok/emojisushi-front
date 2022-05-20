import {SvgIcon} from "../svg/SvgIcon";
import {CloseSvg} from "../svg/CloseSvg";

export const CloseIcon = (
    {
        width = "25px",
        color = "white",
        onClick = () => {},
        rest
    }
) => {
    return <SvgIcon
        width={width}
        color={color}
        onClick={onClick}
        {...rest}
    >
        <CloseSvg/>
    </SvgIcon>
}