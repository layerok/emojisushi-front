import {SvgIcon} from "../../svg/SvgIcon";
import {FlexBox} from "../../FlexBox";
import {forwardRef} from "react";

export const UIButton = forwardRef((
    {
        text,
        children,
        ...rest
    }, ref
) => {

    return (
        <FlexBox ref={ref} alignItems={"center"} {...rest}>
            <SvgIcon color={"white"} width={"25px"}>
                {children}
            </SvgIcon>
            <div style={{marginLeft: "10px"}}>
                {text}
            </div>

        </FlexBox>
    );
})