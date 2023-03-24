import { cloneElement } from "react";
import { SvgIcon } from "../../svg/SvgIcon";
import { TelegramSvg } from "../../svg/TelegramSvg";
import { ButtonFilled } from "../../buttons/Button";
import { NotifyModal } from "../NotifyModal";
import { useTranslation } from "react-i18next";

export const TelegramModal = ({ children, ...rest }) => {
  const { t } = useTranslation();
  return (
    <NotifyModal
      renderTitle={() => t("telegramModal.appeared")}
      renderSubtitle={() => t("telegramModal.stock")}
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
      {...rest}
    >
      {cloneElement(children)}
    </NotifyModal>
  );
};
