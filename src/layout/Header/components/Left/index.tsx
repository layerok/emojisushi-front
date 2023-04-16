import { LocationPickerPopover } from "~components/popovers/LocationPickerPopover";
import * as S from "./styled";
import { NavLinkUnderline } from "~components/NavLinkUnderline";
import { ContactsModal } from "~components/modals/ContactsModal";
import { useTranslation } from "react-i18next";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import Skeleton from "react-loading-skeleton";
import { Logo } from "../Logo";

export const Left = ({ loading = false }: { loading?: boolean }) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();
  const { t } = useTranslation();

  return (
    <S.Left>
      <Logo loading={loading} />
      <S.PcHeaderItem>
        <LocationPickerPopover offset={22} />
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
