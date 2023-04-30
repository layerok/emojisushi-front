import * as S from "./styled";
import {
  ContactsModal,
  NavLinkUnderline,
  LocationPickerPopover,
} from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Logo } from "../Logo";
import { useParams } from "react-router-dom";
import { ICity } from "~api/types";

type LeftProps = { loading?: boolean; cities?: ICity[] };

export const Left = ({ loading = false, cities = [] }: LeftProps) => {
  const { lang, spotSlug, citySlug } = useParams();
  const { t } = useTranslation();

  return (
    <S.Left>
      <Logo loading={loading} />
      <S.PcHeaderItem>
        <LocationPickerPopover cities={cities} loading={loading} offset={22} />
      </S.PcHeaderItem>
      <S.PcHeaderItem>
        {loading ? (
          <Skeleton width={71} height={17.25} />
        ) : (
          <ContactsModal>
            <div>{t("header.contacts")}</div>
          </ContactsModal>
        )}
      </S.PcHeaderItem>

      <S.PcHeaderItem>
        {loading ? (
          <Skeleton width={144} height={17.25} />
        ) : (
          <NavLinkUnderline
            style={{ width: "144px" }}
            to={"/" + [lang, citySlug, spotSlug, "dostavka-i-oplata"].join("/")}
          >
            {t("header.delivery")}
          </NavLinkUnderline>
        )}
      </S.PcHeaderItem>
    </S.Left>
  );
};
