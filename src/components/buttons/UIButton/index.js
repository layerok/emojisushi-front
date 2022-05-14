import {SvgIcon} from "../../svg/SvgIcon";
import {FlexBox} from "../../FlexBox";

export const UIButton = (
    {
        text,
        children,
        ...rest
    }
) => {

    return (
        <FlexBox alignItems={"center"} {...rest}>
            <SvgIcon color={"white"} width={"25px"}>
                {children}
            </SvgIcon>
            <div style={{marginLeft: "10px"}}>
                {text}
            </div>

        </FlexBox>
    );
}