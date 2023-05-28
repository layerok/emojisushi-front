import * as S from "./styled";
import { ContactsModal, LocationPickerPopover } from "~components";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { Logo } from "../Logo";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ICity } from "~api/types";
import { HightlightText } from "~components/HighlightText";

type LeftProps = { loading?: boolean; cities?: ICity[] };

export const Left = ({ loading = false, cities = [] }: LeftProps) => {
  const { lang, spotSlug, citySlug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <S.Left>
      <Logo loading={loading} />
      <S.HeaderItem
        onClick={() => {
          navigate("/" + lang);
        }}
      >
        <LocationPickerPopover cities={cities} loading={loading} offset={22} />
      </S.HeaderItem>
      <S.HeaderItem>
        {loading ? (
          <Skeleton width={71} height={17.25} />
        ) : (
          <ContactsModal>
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
            to={"/" + [lang, citySlug, spotSlug, "dostavka-i-oplata"].join("/")}
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
