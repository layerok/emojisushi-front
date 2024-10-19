import { SvgIcon } from "../../SvgIcon";
import { TelegramSvg } from "../../svg/TelegramSvg";
import { Button } from "~common/ui-components/Button/Button";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import styled, { useTheme } from "styled-components";
import { Modal } from "~components";
import { Times } from "~assets/ui-icons";
import { media } from "~common/custom-media";
import * as S from "./styled";

export const TelegramModal = NiceModal.create(() => {
  const { t } = useTranslation();
  const modal = useModal();

  const theme = useTheme();
  modal.resolve();
  return (
    <Modal
      overlayStyles={{
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.4)",
        zIndex: theme.zIndices.modals,
      }}
      onClose={() => {
        modal.remove();
      }}
      open={modal.visible}
    >
      {({ close }) => (
        <Root>
          <CloseIcon>
            <SvgIcon
              onClick={close}
              hoverColor={theme.colors.brand}
              color={"white"}
              style={{
                cursor: "pointer",
                width: 35,
              }}
            >
              <Times />
            </SvgIcon>
          </CloseIcon>
          <S.Root>
            <SvgIcon color={theme.colors.brand} width={"60px"}>
              <TelegramSvg strokeWidth={1} />
            </SvgIcon>

            <S.Title>{t("telegramModal.appeared")}</S.Title>
            <S.Subtitle>{t("telegramModal.stock")}</S.Subtitle>
            <S.Footer>
              <Button
                filled
                // @ts-ignore
                as={"a"}
                href={"https://t.me/Emojisushibot"}
                target={"_blank"}
                style={{
                  width: 250,
                }}
              >
                {t("telegramModal.go_to")}
              </Button>
            </S.Footer>
          </S.Root>
        </Root>
      )}
    </Modal>
  );
});

const Root = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasInset2Shadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: -35px;
  cursor: pointer;

  ${media.lessThan("pc")`
    right: 10px;
    top: 10px;
  `}
`;
