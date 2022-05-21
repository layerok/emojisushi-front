import {BaseModal} from "../BaseModal";
import * as S from "./styled";
import {CloseModalIcon} from "../CloseModalIcon";

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
        background: "rgba(0, 0, 0, 0.4)",
        zIndex: 999
    }

    return <BaseModal overlayStyles={overlayStyles} render={({close}) => (
        <S.Container width={width} alignCenter={alignCenter}>
            <S.CloseIcon>
                <CloseModalIcon close={close}/>
            </S.CloseIcon>
            {render({close})}
        </S.Container>
    )} {...rest}>
        {children}
    </BaseModal>
}