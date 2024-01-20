import { LowKeySvg, NotifyModal, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { formatWorkingHours } from "~utils/format.utils";
import { appConfig } from "~config/app";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

// todo: reopen this modal every n seconds
export const RestaurantClosed = NiceModal.create(() => {
  const { t } = useTranslation();
  const modal = useModal();
  return (
    <NotifyModal
      open={modal.visible}
      renderTitle={() => t("restaurantClosed.closed")}
      renderSubtitle={() =>
        `${t("restaurantClosed.time")}: ${formatWorkingHours(
          appConfig.workingHours
        )}`
      }
      renderIcon={() => (
        <SvgIcon color={"#FFE600"} width={"60px"}>
          <LowKeySvg />
        </SvgIcon>
      )}
    >
      <div></div>
    </NotifyModal>
  );
});
