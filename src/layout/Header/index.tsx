import * as S from "./styled";
import {
  BurgerSvg,
  CartButton,
  FlexBox,
  HightlightText,
  LanguageSelector,
  LocationPickerPopover,
  LogoSvg,
  SvgButton,
  SvgIcon,
  TinyCartButton,
  Container,
  UserSvg,
  SkeletonWrap,
} from "~components";

import { ICity, IGetCartRes, IUser } from "~api/types";
import { ModalIDEnum } from "~common/modal.constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { ROUTES } from "~routes";
import { useShowModal } from "~modal";
import { useTheme } from "styled-components";

export const Header = ({
  loading = false,
  cart,
  user,
}: {
  loading?: boolean;
  cart?: IGetCartRes;
  user?: IUser;
  cities?: ICity[];
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showModal = useShowModal();
  const theme = useTheme();

  return (
    <S.Container>
      <Container
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FlexBox alignItems={"center"}>
          <S.LogoContainer>
            <SkeletonWrap loading={loading}>
              <Link to={ROUTES.INDEX.path}>
                <SvgIcon clickable={true} color={theme.colors.brand}>
                  <LogoSvg />
                </SvgIcon>
              </Link>
            </SkeletonWrap>
          </S.LogoContainer>

          <S.HeaderItem>
            <SkeletonWrap loading={loading}>
              <LocationPickerPopover offset={22} />
            </SkeletonWrap>
          </S.HeaderItem>

          <S.HeaderItem
            onClick={() => {
              showModal(ModalIDEnum.ContactsModal);
            }}
          >
            <SkeletonWrap loading={loading}>
              <HightlightText>
                <Trans i18nKey="header.contacts" />
              </HightlightText>
            </SkeletonWrap>
          </S.HeaderItem>

          <S.HeaderItem>
            <SkeletonWrap loading={loading}>
              <NavLink
                style={{
                  color: "white",
                  textDecoration: "none",
                  width: "144px",
                }}
                to={ROUTES.DELIVERYANDPAYMENT.path}
              >
                {({ isActive }) => (
                  <HightlightText isActive={isActive}>
                    {t("header.delivery")}
                  </HightlightText>
                )}
              </NavLink>
            </SkeletonWrap>
          </S.HeaderItem>
        </FlexBox>
        <FlexBox alignItems={"center"}>
          <S.LanguageSelectorContainer>
            <LanguageSelector loading={loading} />
          </S.LanguageSelectorContainer>

          <S.CartBtn>
            <SkeletonWrap borderRadius={10} loading={loading}>
              <CartButton
                onClick={() => {
                  showModal(ModalIDEnum.CartModal);
                }}
                count={cart?.totalQuantity}
                total={cart?.total}
              />
            </SkeletonWrap>
          </S.CartBtn>

          {cart && (
            <S.TinyCartBtn
              onClick={() => {
                showModal(ModalIDEnum.CartModal);
              }}
            >
              <TinyCartButton loading={loading} price={cart?.total} />
            </S.TinyCartBtn>
          )}

          <S.BurgerBtn>
            <SkeletonWrap loading={loading}>
              <SvgIcon
                onClick={() => {
                  showModal(ModalIDEnum.MobMenuModal);
                }}
                width={"32px"}
                color={"white"}
              >
                <BurgerSvg />
              </SvgIcon>
            </SkeletonWrap>
          </S.BurgerBtn>

          <S.UserBtn>
            <SkeletonWrap loading={loading} borderRadius={10}>
              <SvgButton
                onClick={() => {
                  if (user) {
                    navigate(ROUTES.ACCOUNT.PROFILE.path);
                  } else {
                    showModal(ModalIDEnum.AuthModal);
                  }
                }}
              >
                <SvgIcon clickable={true} width={"25px"} color={"black"}>
                  <UserSvg />
                </SvgIcon>
              </SvgButton>
            </SkeletonWrap>
          </S.UserBtn>
        </FlexBox>
      </Container>
    </S.Container>
  );
};
