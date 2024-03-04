import { LowKeySvg, NotifyModal, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { addLeadingZero } from "~utils/format.utils";
import { appConfig } from "~config/app";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import { useTheme } from "styled-components";

// todo: reopen this modal every n seconds
export const RestaurantClosed = NiceModal.create(() => {
  const { t } = useTranslation();
  const modal = useModal();
  const theme = useTheme();
  modal.resolve();
  return (
    <NotifyModal
      onClose={() => {
        modal.remove();
      }}
      open={modal.visible}
      renderTitle={() => t("restaurantClosed.closed")}
      renderSubtitle={() =>
        t("restaurantClosed.time", {
          from: `${appConfig.workingHours[0][0]}:${addLeadingZero(
            appConfig.workingHours[0][1]
          )}`,
          to: `${appConfig.workingHours[1][0]}:${addLeadingZero(
            appConfig.workingHours[1][1]
          )}`,
        })
      }
      renderIcon={() => (
        <SvgIcon color={theme.colors.brand} width={"60px"}>
          <LowKeySvg />
        </SvgIcon>
      )}
    />
  );
});
