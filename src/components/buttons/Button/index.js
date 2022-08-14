import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {SpinnerSvg} from "../../svg/SpinnerSvg";

export const Button = (
    {
        children,
        width,
        filled = false,
        padding,
        loading = false,
        justifyContent,
        outline = true,
        color = "#FFE600",
        hoverColor = "black",
        backgroundColor = "transparent",
        hoverBackgroundColor = "#FFE600",
        hoverOutline = false,
        minWidth = "130px",
        ...rest
    }) => {
    return <S.Button
        minWidth={minWidth}
        outline={outline}
        backgroundColor={backgroundColor}
        hoverBackgroundColor={hoverBackgroundColor}
        hoverOutline={hoverOutline}
        color={color}
        hoverColor={hoverColor}
        loading={loading}
        padding={padding}
        filled={filled}
        width={width}
        justifyContent={justifyContent}

        {...rest}
    >
        {loading ? (
            <SvgIcon width={"25px"} color={"black"}>
                <SpinnerSvg/>
            </SvgIcon>
        ) : (
            children
        )}
    </S.Button>
}

export const ButtonOutline = (
    {
        children,
        ...rest
    }) => {
    return <Button {...rest} filled={false} outline={true}>
        {children}
    </Button>
}

export const ButtonFilled = (
    {
        children,
        ...rest
    }) => {
    return <Button {...rest} backgroundColor={"#FFE600"} color={"black"} filled={true}>
        {children}
    </Button>
}

export const ButtonDark = (
    {
        children,
        ...rest
    }
) => {

    return (

        <Button outline={false}
                color={"#FFFFFF"}
                backgroundColor={"#272727"}
                hoverBackgroundColor={"#272727"}
                hoverColor={"#FFE600"}
                hoverOutline={true}
                {...rest}
        >
            {children}
        </Button>
    )
}