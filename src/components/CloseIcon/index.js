import {SvgIcon} from "../svg/SvgIcon";
import {CloseSvg} from "../svg/CloseSvg";
import {forwardRef} from "react";

export const CloseIcon = forwardRef((
    {
        width = "25px",
        color = "white",
        onClick = () => {},
        rest
    },
    ref
) => {
    return <SvgIcon
        width={width}
        color={color}
        ref={ref}
        onClick={onClick}
        hoverColor={"#FFE600"}
        {...rest}
    >
        <CloseSvg/>
    </SvgIcon>
})