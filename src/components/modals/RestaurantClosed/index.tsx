import { SvgIcon } from "../../SvgIcon";
import { NotifyModal } from "../NotifyModal";
import { LowKeySvg } from "../../svg/LowKeySvg";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useAppStore } from "~hooks/use-app-store";

export const RestaurantClosed = observer(({ open }) => {
  const AppStore = useAppStore();
  const { t } = useTranslation();
  return (
    <NotifyModal
      open={open}
      renderTitle={() => t("restaurantClosed.closed")}
      renderSubtitle={() =>
        `${t("restaurantClosed.time")}: ${AppStore.formatWorkingHours()}`
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
