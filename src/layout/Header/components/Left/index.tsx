import * as S from "./styled";
import {
  ContactsModal,
  LocationPickerPopover,
  HightlightText,
} from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Logo } from "../Logo";
import { NavLink } from "react-router-dom";
import { ICity } from "~api/types";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";

type LeftProps = { loading?: boolean; cities?: ICity[] };

export const Left = observer(({ loading = false, cities = [] }: LeftProps) => {
  const { t } = useTranslation();
  const appStore = useAppStore();

  return (
    <S.Left>
      <Logo loading={loading} />
      <S.HeaderItem>
        <LocationPickerPopover cities={cities} loading={loading} offset={22} />
      </S.HeaderItem>
      <S.HeaderItem>
        {loading ? (
          <Skeleton width={71} height={17.25} />
        ) : (
          <ContactsModal spot={appStore.spot}>
            <div>{t("header.contacts")}</div>
          </ContactsModal>
        )}
      </S.HeaderItem>

      <S.HeaderItem>
        {loading ? (
          <Skeleton width={144} height={17.25} />
        ) : (
          <NavLink
            style={{ color: "white", textDecoration: "none", width: "144px" }}
            to={"/dostavka-i-oplata"}
          >
            {({ isActive }) => (
              <HightlightText isActive={isActive}>
                {t("header.delivery")}
              </HightlightText>
            )}
          </NavLink>
        )}
      </S.HeaderItem>
    </S.Left>
  );
});
