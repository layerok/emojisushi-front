import {cloneElement} from "react";
import {Dialog} from "../Dialog";
import * as S from "./styled";

export const NotifyDialog = (
    {
        children,
        renderTitle,
        renderSubtitle,
        renderButton,
        renderIcon,
        open
    }
) => {
    return <Dialog alignCenter={true} open={open} render={() => (
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
    </Dialog>
}