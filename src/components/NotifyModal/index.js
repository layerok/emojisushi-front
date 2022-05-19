import {cloneElement} from "react";
import {Modal} from "../Modal";
import * as S from "./styled";

export const NotifyModal = (
    {
        children,
        renderTitle,
        renderSubtitle,
        renderButton,
        renderIcon,
        open,
        ...rest
    }
) => {
    return <Modal alignCenter={true} open={open} {...rest} render={({close}) => (
        <S.Container>
            {renderIcon && renderIcon()}
            {renderTitle && (
                <S.Title>
                    {renderTitle()}
                </S.Title>
            )}
            {renderSubtitle && (
                <S.Subtitle>
                    {renderSubtitle()}
                </S.Subtitle>
            )}
            {renderButton && (
                <S.Button>
                    {renderButton()}
                </S.Button>
            )}

        </S.Container>

    )}>
        {cloneElement(children)}
    </Modal>
}