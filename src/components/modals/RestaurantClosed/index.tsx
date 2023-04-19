import { LowKeySvg, NotifyModal, SvgIcon } from "~components";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { formatWorkingHours } from "~utils/format.utils";
import { appConfig } from "~config/app";

export const RestaurantClosed = observer(({ open }) => {
  const { t } = useTranslation();
  return (
    <NotifyModal
      open={open}
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
