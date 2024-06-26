import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import * as S from "./styled";
import {
  FlexBox,
  LightCounter,
  BaseModal,
  Price,
  SvgIcon,
  LogoSvg,
  // todo: replace SushiSvg because it is fake svg, it is png actually
  SushiSvg,
} from "~components";
import { CartProduct } from "~models";
import { cartQuery } from "~queries";

import { ROUTES } from "~routes";
import { useModal } from "~modal";

import { Button } from "~common/ui-components/Button/Button";
import { ConfirmActionPopover } from "~components/ConfirmActionPopover";

import { useBreakpoint2 } from "~common/hooks";

import { useRemoveCartProduct } from "~hooks/use-remove-cart-product";
import { useUpdateCartProduct } from "~hooks/use-update-cart-product";

import { Times } from "~assets/ui-icons";

// todo: clear outdated products from the card. You can do it on the frontend or on the backend
const CartItem = (props: { item: CartProduct }) => {
  const { item } = props;

  const newPrice = item.product.getNewPrice(item.variant)?.price_formatted;
  const oldPrice = item.product.getOldPrice(item.variant)?.price_formatted;
  const nameWithMods = item.nameWithMods;
  const [open, setOpen] = useState(false);

  const { mutate: removeCartProduct } = useRemoveCartProduct();
  const { mutate: updateCartProduct } = useUpdateCartProduct();

  const changeCartItemQuantity = async (item: CartProduct, quantity) => {
    if (item.quantity + quantity <= 0) {
      setOpen(true);
    } else {
      updateCartProduct({
        item: item,
        quantity: quantity,
      });
    }
  };

  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <S.Item>
      <S.ItemRemoveIcon>
        <ConfirmActionPopover
          open={open}
          onOpenChange={setOpen}
          onConfirm={() =>
            removeCartProduct({
              id: item.id,
            })
          }
          text={t("cartModal.remove")}
        >
          <SvgIcon
            onClick={() => setOpen(true)}
            color={theme.colors.grey[450]}
            hoverColor={theme.colors.brand}
            style={{
              cursor: "pointer",
              width: 25,
            }}
          >
            <Times />
          </SvgIcon>
        </ConfirmActionPopover>
      </S.ItemRemoveIcon>
      <S.ItemImg src={item.product.mainImage}>
        {!item.product.mainImage && (
          <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
            <LogoSvg />
          </SvgIcon>
        )}
      </S.ItemImg>
      <S.ItemInfo>
        <S.ItemName title={nameWithMods}>{nameWithMods}</S.ItemName>
        <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
          <S.ItemCounter>
            <LightCounter
              handleIncrement={() => changeCartItemQuantity(item, 1)}
              handleDecrement={() => changeCartItemQuantity(item, -1)}
              count={item.quantity}
            />
          </S.ItemCounter>
          <Price newPrice={newPrice} oldPrice={oldPrice} />
        </FlexBox>
      </S.ItemInfo>
    </S.Item>
  );
};

export const CartModal = NiceModal.create(() => {
  const navigate = useNavigate();
  const modal = useModal();
  const theme = useTheme();

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);

  const { data } = cart;

  const { isMobile } = useBreakpoint2();

  const { t } = useTranslation();

  // we don't unmount deleted cart product right away, because if we do so,
  // then cart product's fetcher will be aborted,
  // and therefore revalidation won't be triggered and we will see stale cart products
  const items = data.map((json) => new CartProduct(json));

  const overlayStyles = {
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: theme.zIndices.modals,
    ...(!isMobile && {
      justifyItems: "end",
      alignItems: "start",
    }),
  };

  // max cart items wrapper height is 500px and min is 300px
  // 252px is sum of heights another element in cart modal
  const finalHeight = Math.max(Math.min(500 - 252, 500), 300);

  const itemsContainerStyles: CSSProperties = {
    minHeight: isMobile ? "auto" : 362 + "px",
    maxHeight: isMobile ? "calc(100vh - 250px)" : finalHeight + "px",
    overflowY: "auto",
  };

  const checkout = () => {
    navigate(ROUTES.CHECKOUT.path);
    modal.remove();
  };

  const closeModal = () => {
    modal.remove();
  };

  return (
    <BaseModal
      open={modal.visible}
      onClose={closeModal}
      overlayStyles={overlayStyles}
    >
      {() => (
        <S.Wrapper>
          <S.CloseIcon>
            <SvgIcon
              onClick={closeModal}
              color={"white"}
              hoverColor={theme.colors.brand}
              style={{
                cursor: "pointer",
                width: 35,
              }}
            >
              <Times />
            </SvgIcon>
          </S.CloseIcon>

          {items.length === 0 && (
            <S.EmptyCartImgContainer>
              <SushiSvg />
              <S.Title>{t("cartModal.empty")}</S.Title>
            </S.EmptyCartImgContainer>
          )}

          {items.length !== 0 && (
            <S.Items style={itemsContainerStyles}>
              {items.map((item, i) => (
                <CartItem key={item.id} item={item} />
              ))}
            </S.Items>
          )}

          {items.length !== 0 && (
            <S.Footer>
              <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                <S.Sum>{t("cartModal.sum_order")}</S.Sum>
                <Price newPrice={cart.total} />
              </FlexBox>
              <S.Button>
                <Button
                  disabled={items.length === 0}
                  onClick={checkout}
                  style={{
                    width: "100%",
                  }}
                >
                  {t("cartModal.checkout")}
                </Button>
              </S.Button>
            </S.Footer>
          )}
        </S.Wrapper>
      )}
    </BaseModal>
  );
});
