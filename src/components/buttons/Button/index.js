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
        ...rest
    }) => {
    return <S.Button loading={loading} padding={padding} filled={filled} width={width} justifyContent={justifyContent} {...rest}>
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