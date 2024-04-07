import React from "react";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import { BaseModal, MinusSvg, PlusSvg, SvgIcon } from "~components";
import * as S from "./styled";
import { useTheme } from "styled-components";
import { useBreakpoint2 } from "~common/hooks";

export const ProductModal = NiceModal.create(() => {
  const modal = useModal();
  const theme = useTheme();
  const { isMobile } = useBreakpoint2();

  const overlayStyles = {
    zIndex: theme.zIndices.modals,
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",

    ...(!isMobile && {
      justifyContent: "center",
      alignItems: "center",
    }),
  };

  return (
    <BaseModal
      overlayStyles={overlayStyles}
      open={modal.visible}
      onClose={() => {
        modal.remove();
      }}
    >
      {() => (
        <S.Wrapper>
          <S.TopWrapper>
            <S.ImageWrapper>
              <S.Image />
            </S.ImageWrapper>
            <S.DescriptionWrapper>
              <S.ProductName>Піца 4 сири</S.ProductName>
              <S.Description>
                Інгредієнти: Соус білий, Сир моцарела, Сир Чеддр, Сир Дорблю,
                Сир Пармезан{" "}
              </S.Description>
            </S.DescriptionWrapper>
          </S.TopWrapper>
          <S.BotWrapper>
            <S.ProductPrice>189 ₴</S.ProductPrice>
            <S.ButtonWrapper>
              <S.RemoveButton>
                <SvgIcon width="15px" color="#6A6A6A">
                  <MinusSvg />
                </SvgIcon>
              </S.RemoveButton>
              <S.Counter>1</S.Counter>
              <S.AddButton>
                <SvgIcon width="15px" color="#FFE600">
                  <PlusSvg />
                </SvgIcon>
              </S.AddButton>
            </S.ButtonWrapper>
            <S.CartButton>До кошика</S.CartButton>
          </S.BotWrapper>
        </S.Wrapper>
      )}
    </BaseModal>
  );
});
