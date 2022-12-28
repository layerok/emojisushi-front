import {BaseModal, IBaseModalProps} from "../BaseModal";
import * as S from "./styled";
import {CloseModalIcon} from "../CloseModalIcon";
import {ReactNode} from "react";
import {IAlignItems, IJustifyContent} from "~components/FlexBox";

export type IModalProps = {
  children: ReactNode;
  alignItems?: IAlignItems;
  justifyContent?: IJustifyContent;
  render: (props: {close: () => void}) => ReactNode;
  width?: string;
  alignCenter?: boolean;
} & Omit<IBaseModalProps, 'overlayStyles' | 'render'>;

export const Modal = (
    {
        children,
        alignItems = "center",
        justifyContent = "center",
        render,
        width,
        alignCenter,
        ...rest
    }: IModalProps) => {

    const overlayStyles = {
        display: "grid",
        justifyContent,
        alignItems,
        background: "rgba(0, 0, 0, 0.4)",
        zIndex: 999999
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
