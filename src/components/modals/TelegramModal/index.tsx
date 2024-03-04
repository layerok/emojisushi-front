import { SvgIcon } from "../../SvgIcon";
import { TelegramSvg } from "../../svg/TelegramSvg";
import { ButtonFilled } from "../../buttons/Button";
import { NotifyModal } from "../NotifyModal";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import { useTheme } from "styled-components";

export const TelegramModal = NiceModal.create(() => {
  const { t } = useTranslation();
  const modal = useModal();

  const theme = useTheme();
  modal.resolve();
  return (
    <NotifyModal
      open={modal.visible}
      renderTitle={() => t("telegramModal.appeared")}
      renderSubtitle={() => t("telegramModal.stock")}
      onClose={() => {
        modal.remove();
      }}
      renderIcon={() => (
        <SvgIcon color={theme.colors.brand} width={"60px"}>
          <TelegramSvg strokeWidth={1} />
        </SvgIcon>
      )}
      renderButton={() => (
        <ButtonFilled
          as={"a"}
          href={"https://t.me/Emojisushibot"}
          target={"_blank"}
          width={"250px"}
        >
          {t("telegramModal.go_to")}
        </ButtonFilled>
      )}
    />
  );
});
