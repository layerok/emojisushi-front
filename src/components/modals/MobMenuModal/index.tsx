import { ReactElement, cloneElement } from "react";
import * as S from "./styled";
import {
  LocationPickerPopover,
  SvgIcon,
  FlexBox,
  NavLinkUnderline,
  ContactsModal,
  BaseModal,
  HeartSvg,
  UserSvg,
  AuthModal,
  LanguageSelector,
} from "~components";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { ICity } from "~api/types";

type MobMenuModalProps = {
  children: ReactElement;
  cities?: ICity[];
};

export const MobMenuModal = ({ children, cities = [] }: MobMenuModalProps) => {
  const overlayStyles = {
    justifyItems: "end",
    alignItems: "start",
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: 999999,
  };
  const { t } = useTranslation();
  const { lang, spotSlug, citySlug } = useParams();
  return (
    <BaseModal
      overlayStyles={overlayStyles}
      render={({ close }) => (
        <S.Wrapper>
          <S.Item>
            <LanguageSelector />
          </S.Item>
          <S.Item style={{ height: "25px" }}>
            <LocationPickerPopover
              cities={cities}
              width={"226px"}
              backgroundColor={"#1C1C1C"}
            />
          </S.Item>
          <S.Item>
            <AuthModal>
              <FlexBox alignItems={"center"}>
                <SvgIcon width={"25px"} style={{ marginRight: "10px" }}>
                  <UserSvg />
                </SvgIcon>
                {t("common.enter_account")}
              </FlexBox>
            </AuthModal>
          </S.Item>
          <S.Item>
            <ContactsModal>
              <div>{t("mobMenuModal.contacts")}</div>
            </ContactsModal>
          </S.Item>
          <S.Item>
            <NavLinkUnderline
              to={
                "/" + [lang, citySlug, spotSlug, "dostavka-i-oplata"].join("/")
              }
            >
              <div>{t("mobMenuModal.delivery")}</div>
            </NavLinkUnderline>
          </S.Item>
          <S.Item>
            <FlexBox justifyContent={"space-between"} alignItems={"center"}>
              <NavLinkUnderline
                to={"/" + [lang, citySlug, spotSlug, "wishlist"].join("/")}
              >
                <div>{t("common.favorite")}</div>
              </NavLinkUnderline>
              <SvgIcon color={"#FFE600"} width={"25px"}>
                <HeartSvg />
              </SvgIcon>
            </FlexBox>
          </S.Item>
        </S.Wrapper>
      )}
    >
      {cloneElement(children)}
    </BaseModal>
  );
};
