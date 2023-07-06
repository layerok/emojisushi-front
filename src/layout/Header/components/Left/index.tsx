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
import { useQuery } from "@tanstack/react-query";
import { spotQuery } from "~domains/spot/queries/spot.query";
import { getFromLocalStorage } from "~utils/ls.utils";

type LeftProps = { loading?: boolean; cities?: ICity[] };

export const Left = ({ loading = false, cities = [] }: LeftProps) => {
  const { t } = useTranslation();
  const { data: spot, isLoading } = useQuery(
    spotQuery(getFromLocalStorage("selectedSpotSlug"))
  );

  return (
    <S.Left>
      <Logo loading={loading} />
      <S.HeaderItem>
        <LocationPickerPopover cities={cities} loading={loading} offset={22} />
      </S.HeaderItem>
      <S.HeaderItem>
        {isLoading ? (
          <Skeleton width={71} height={17.25} />
        ) : (
          <ContactsModal spot={spot}>
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
};
