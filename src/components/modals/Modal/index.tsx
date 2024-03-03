import { BaseModal, IBaseModalProps } from "../BaseModal";
import * as S from "./styled";
import { CloseModalIcon } from "../CloseModalIcon";
import { CSSProperties, ReactNode } from "react";
import { useTheme } from "styled-components";

export type IModalProps = {
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  children: ReactNode | { (props: { close: () => void }): ReactNode };
  width?: string;
  alignCenter?: boolean;
} & Omit<IBaseModalProps, "overlayStyles" | "children">;

export const Modal = ({
  alignItems = "center",
  justifyContent = "center",
  children,
  width,
  alignCenter,
  ...rest
}: IModalProps) => {
  const theme = useTheme();
  const overlayStyles = {
    display: "grid",
    justifyContent,
    alignItems,
    background: "rgba(0, 0, 0, 0.4)",
    zIndex: theme.zIndices.modals,
  };
  return (
    <BaseModal overlayStyles={overlayStyles} {...rest}>
      {({ close }) => (
        <S.Container width={width} alignCenter={alignCenter}>
          <S.CloseIcon>
            <CloseModalIcon close={close} />
          </S.CloseIcon>
          {typeof children === "function" ? children({ close }) : children}
        </S.Container>
      )}
    </BaseModal>
  );
};
