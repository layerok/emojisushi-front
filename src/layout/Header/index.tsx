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
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

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
              <Link to={"/"}>
                <SvgIcon clickable={true} color={"#FFE600"}>
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
            onClick={() => NiceModal.show(ModalIDEnum.ContactsModal)}
          >
            <SkeletonWrap loading={loading}>
              <Trans i18nKey="header.contacts" />
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
                to={"/dostavka-i-oplata"}
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

          <S.CartBtn
            onClick={() => {
              NiceModal.show(ModalIDEnum.CartModal);
            }}
          >
            <SkeletonWrap borderRadius={10} loading={loading}>
              <CartButton count={cart?.totalQuantity} total={cart?.total} />
            </SkeletonWrap>
          </S.CartBtn>

          {cart && (
            <S.TinyCartBtn
              onClick={() => {
                NiceModal.show(ModalIDEnum.CartModal);
              }}
            >
              <TinyCartButton loading={loading} price={cart?.total} />
            </S.TinyCartBtn>
          )}

          <S.BurgerBtn>
            <SkeletonWrap loading={loading}>
              <SvgIcon
                onClick={() => {
                  NiceModal.show(ModalIDEnum.MobMenuModal);
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
                    navigate("/account/profile");
                  } else {
                    NiceModal.show(ModalIDEnum.AuthModal);
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
