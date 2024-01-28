import { ReactNode } from "react";
import { IModalProps, Modal } from "../Modal";
import * as S from "./styled";

export type INotifyModalProps = {
  renderTitle?: () => ReactNode;
  renderSubtitle?: () => ReactNode;
  renderButton?: () => ReactNode;
  renderIcon?: () => ReactNode;
} & Omit<IModalProps, "children">;

export const NotifyModal = ({
  renderTitle,
  renderSubtitle,
  renderButton,
  renderIcon,
  open,
  ...rest
}: INotifyModalProps) => {
  return (
    <Modal open={open} alignCenter={true} {...rest}>
      {({ close }) => (
        <S.Container>
          {renderIcon && renderIcon()}
          {renderTitle && <S.Title>{renderTitle()}</S.Title>}
          {renderSubtitle && <S.Subtitle>{renderSubtitle()}</S.Subtitle>}
          {renderButton && <S.Button>{renderButton()}</S.Button>}
        </S.Container>
      )}
    </Modal>
  );
};
