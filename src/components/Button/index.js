import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {SpinnerSvg} from "../svg/SpinnerSvg";

export const Button = (
    {
        children,
        width,
        filled = false
    }) => {
    return <S.Button filled={filled} width={width}>
        {children}
    </S.Button>
}

export const ButtonOutline = (
    {
        children,
        width,
    }) => {
    return <Button filled={false} width={width}>
        {children}
    </Button>
}

export const ButtonFilled = (
    {
        children,
        width,
    }) => {
    return <Button filled={true} width={width}>
        {children}
    </Button>
}

export const PendingButton = (
    {
        width
    }
) => {
    return (<ButtonFilled width={width}>
        <SvgIcon width={"25px"} color={"black"}>
            <SpinnerSvg/>
        </SvgIcon>
    </ButtonFilled>)
}