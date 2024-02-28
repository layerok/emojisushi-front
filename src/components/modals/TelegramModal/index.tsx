import { SvgIcon } from "../../SvgIcon";
import { TelegramSvg } from "../../svg/TelegramSvg";
import { ButtonFilled } from "../../buttons/Button";
import { NotifyModal } from "../NotifyModal";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";

export const TelegramModal = NiceModal.create(() => {
  const { t } = useTranslation();
  const modal = useModal();

  return (
    <NotifyModal
      open={modal.visible}
      renderTitle={() => t("telegramModal.appeared")}
      renderSubtitle={() => t("telegramModal.stock")}
      onClose={() => {
        modal.remove();
      }}
      renderIcon={() => (
        <SvgIcon color={"#FFE600"} width={"60px"}>
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
