import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {SpinnerSvg} from "../svg/SpinnerSvg";

export const Button = (
    {
        children,
        width,
        filled = false,
        padding,
        justifyContent,
        ...rest
    }) => {
    return <S.Button padding={padding} filled={filled} width={width} justifyContent={justifyContent} {...rest}>
        {children}
    </S.Button>
}

export const ButtonOutline = (
    {
        children,
        ...rest
    }) => {
    return <Button {...rest} filled={false}>
        {children}
    </Button>
}

export const ButtonFilled = (
    {
        children,
        ...rest
    }) => {
    return <Button {...rest} filled={true}>
        {children}
    </Button>
}

export const PendingButton = (props) => {
    return (<ButtonFilled {...props}>
        <SvgIcon width={"25px"} color={"black"}>
            <SpinnerSvg/>
        </SvgIcon>
    </ButtonFilled>)
}