import * as S from "./styled";
import {
  FlexBox,
  LightCounter,
  BaseModal,
  Price,
  CloseModalIcon,
  CloseIcon,
  ButtonOutline,
  ConfirmActionPopover,
  SvgIcon,
  LogoSvg,
  // todo: replace SushiSvg because it is fake svg, it is png actually
  SushiSvg,
} from "~components";

import { useState } from "react";
import { useBreakpoint2 } from "~common/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartProduct } from "~models";
import { cartQuery } from "~queries";
import { useQuery } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import { ROUTES } from "~routes";
import { useRemoveCartProduct } from "~hooks/use-remove-cart-product";
import { useUpdateCartProduct } from "~hooks/use-update-cart-product";
import { useModal } from "~modal";

// todo: clear outdated products from the card. You can do it on the frontend or on the backend
const CartItem = (props: { item: CartProduct }) => {
  const { item } = props;
  const [key, setKey] = useState(0);
  const newPrice = item.product.getNewPrice(item.variant)?.price_formatted;
  const oldPrice = item.product.getOldPrice(item.variant)?.price_formatted;
  const nameWithMods = item.nameWithMods;
  const [open, setOpen] = useState(false);

  const removeCartProduct = useRemoveCartProduct();
  const updateCartProduct = useUpdateCartProduct();

  const changeCartItemQuantity = async (item: CartProduct, quantity) => {
    if (item.quantity + quantity <= 0) {
      setKey((prev) => prev + 1);
      setOpen(true);
    } else {
      updateCartProduct.mutate({
        item: item,
        quantity: quantity,
      });
    }
  };

  const { t } = useTranslation();

  return (
    <S.Item>
      <S.ItemRemoveIcon>
        <ConfirmActionPopover
          // Hack: I'am changing key to remount component to reset 'initiallyOpen' state
          key={key}
          initiallyOpen={open}
          onConfirm={({ close }) => {
            removeCartProduct.mutate({
              id: item.id,
            });
            setOpen(false);
            close();
          }}
          onCancel={({ close }) => {
            setOpen(false);
            close();
          }}
          text={t("cartModal.remove")}
        >
          <CloseIcon color={"#4A4A4A"} />
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
              handleIncrement={() => {
                changeCartItemQuantity(item, 1);
              }}
              handleDecrement={() => {
                changeCartItemQuantity(item, -1);
              }}
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
  modal.resolve();
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
    zIndex: 999999,
    ...(!isMobile && {
      justifyItems: "end",
      alignItems: "start",
    }),
  };

  // max cart items wrapper height is 500px and min is 300px
  // 252px is sum of heights another element in cart modal
  const finalHeight = Math.max(Math.min(500 - 252, 500), 300);

  return (
    <BaseModal
      open={modal.visible}
      onClose={() => {
        modal.remove();
      }}
      overlayStyles={overlayStyles}
    >
      {({ close }) => (
        <S.Wrapper>
          <S.CloseIcon>
            <CloseModalIcon close={close} />
          </S.CloseIcon>

          {items.length === 0 && (
            <S.EmptyCartImgContainer>
              <SushiSvg />
              <S.Title>{t("cartModal.empty")}</S.Title>
            </S.EmptyCartImgContainer>
          )}

          {items.length !== 0 && (
            <S.Items
              style={{
                minHeight: isMobile ? "auto" : 362 + "px",
                maxHeight: isMobile
                  ? "calc(100vh - 250px)"
                  : finalHeight + "px",
                overflowY: "auto",
              }}
            >
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
                <ButtonOutline
                  disabled={items.length === 0}
                  onClick={() => {
                    navigate(ROUTES.CHECKOUT.path);
                    modal.remove();
                    close();
                  }}
                  width={"100%"}
                >
                  {t("cartModal.checkout")}
                </ButtonOutline>
              </S.Button>
            </S.Footer>
          )}
        </S.Wrapper>
      )}
    </BaseModal>
  );
});
