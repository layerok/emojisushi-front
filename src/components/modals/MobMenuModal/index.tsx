import * as S from "./styled";
import {
  LocationPickerPopover,
  SvgIcon,
  FlexBox,
  BaseModal,
  HeartSvg,
  UserSvg,
  LanguageSelector,
} from "~components";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { HightlightText } from "~components";
import { useUser } from "~hooks/use-auth";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~queries/cities.query";
import { ROUTES } from "~routes";
import { useModal, useShowModal } from "~modal";
import { useTheme } from "styled-components";

export const MobMenuModal = NiceModal.create(() => {
  const modal = useModal();
  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const theme = useTheme();
  const overlayStyles = {
    justifyItems: "end",
    alignItems: "start",
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: theme.zIndices.modals,
  };
  const { data: user } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const showModal = useShowModal();
  if (isCitiesLoading) {
    return null;
  }

  return (
    <BaseModal
      open={modal.visible}
      onClose={() => {
        modal.remove();
      }}
      overlayStyles={overlayStyles}
    >
      <S.Wrapper>
        <S.Item>
          <LanguageSelector />
        </S.Item>
        <S.Item style={{ height: "25px" }}>
          <LocationPickerPopover
            width={"226px"}
            backgroundColor={theme.colors.canvas.inset2}
          />
        </S.Item>
        <S.Item>
          {user ? (
            <FlexBox
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(ROUTES.ACCOUNT.path);
                modal.remove();
              }}
              alignItems={"center"}
            >
              <SvgIcon width={"25px"} style={{ marginRight: "10px" }}>
                <UserSvg />
              </SvgIcon>
              {t("account.cabinet")}
            </FlexBox>
          ) : (
            <FlexBox
              alignItems={"center"}
              onClick={() => {
                NiceModal.show(ModalIDEnum.AuthModal);
                modal.remove();
              }}
            >
              <SvgIcon width={"25px"} style={{ marginRight: "10px" }}>
                <UserSvg />
              </SvgIcon>
              {t("common.enter_account")}
            </FlexBox>
          )}
        </S.Item>
        <S.Item>
          <div
            onClick={() => {
              NiceModal.show(ModalIDEnum.ContactsModal);
              modal.remove();
            }}
          >
            {t("mobMenuModal.contacts")}
          </div>
        </S.Item>
        <S.Item>
          <NavLink
            style={{ color: "white", textDecoration: "none" }}
            to={ROUTES.DELIVERYANDPAYMENT.path}
            onClick={() => {
              modal.remove();
            }}
          >
            {({ isActive }) => (
              <HightlightText isActive={isActive}>
                <div>{t("mobMenuModal.delivery")}</div>
              </HightlightText>
            )}
          </NavLink>
        </S.Item>
        <S.Item>
          <FlexBox justifyContent={"space-between"} alignItems={"center"}>
            <NavLink
              style={{ color: "white", textDecoration: "none" }}
              to={ROUTES.CATEGORY.WISHLIST.path}
              onClick={() => {
                modal.remove();
              }}
            >
              {({ isActive }) => (
                <HightlightText isActive={isActive}>
                  <div>{t("common.favorite")}</div>
                </HightlightText>
              )}
            </NavLink>
            <SvgIcon color={theme.colors.brand} width={"25px"}>
              <HeartSvg />
            </SvgIcon>
          </FlexBox>
        </S.Item>
      </S.Wrapper>
    </BaseModal>
  );
});
