import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {CloseSvg} from "../svg/CloseSvg";

export const Modal = (
    {
        children,
        alignItems = "center",
        justifyItems = "center",
        render,
        width,
        alignCenter,
        ...rest
    }) => {

    const overlayStyles = {
        display: "grid",
        justifyItems,
        alignItems,
        background: "rgba(0, 0, 0, 0.4)"
    }

    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Container width={width} alignCenter={alignCenter}>
            <S.CloseIcon onClick={() => close()}>
                <SvgIcon width={"35px"} color={"white"}>
                    <CloseSvg/>
                </SvgIcon>
            </S.CloseIcon>
            {render({close})}
        </S.Container>
    )} {...rest}>
        {children}
    </BaseModal>
}