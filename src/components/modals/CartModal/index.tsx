import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import * as S from "./styled";
import {
  FlexBox,
  LightCounter,
  Modal,
  Price,
  SvgIcon,
  LogoSvg,
  // todo: replace SushiSvg because it is fake svg, it is png actually
  SushiSvg,
} from "~components";
import { CartProduct } from "~models";
import { cartQuery } from "~domains/cart/cart.query";

import { ROUTES } from "~routes";
import { useModal } from "~modal";

import { Button } from "~common/ui-components/Button/Button";

import { useBreakpoint2 } from "~common/hooks";

import { Times } from "~assets/ui-icons";
import { useDebouncedAddProductToCart } from "~hooks/use-debounced-add-product-to-cart";

// todo: clear outdated products from the card. You can do it on the frontend or on the backend
const CartItem = (props: { item: CartProduct }) => {
  const { item } = props;
  const theme = useTheme();

  const newPrice = item.product.getNewPrice(item.variant)?.price_formatted;
  const oldPrice = item.product.getOldPrice(item.variant)?.price_formatted;
  const nameWithMods = item.nameWithMods;

  const variant = item.variant;
  const product = item.product;
  const count = item?.quantity || 0;

  const { createUpdateHandler } = useDebouncedAddProductToCart();

  const handleDecrement = () => {
    if (count === 1) {
      return;
    }
    createUpdateHandler({
      delta: -1,
      product: product,
      variant: variant,
      currentCount: count,
    })();
  };

  const handleIncrement = createUpdateHandler({
    delta: 1,
    product: product,
    variant: variant,
    currentCount: count,
  });

  const handleDelete = createUpdateHandler({
    delta: -count,
    product: product,
    variant: variant,
    currentCount: count,
  });

  return (
    <S.Item>
      <S.ItemRemoveIcon>
        <SvgIcon
          onClick={handleDelete}
          color={theme.colors.grey[450]}
          hoverColor={theme.colors.brand}
          style={{
            cursor: "pointer",
            width: 25,
          }}
        >
          <Times />
        </SvgIcon>
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
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              count={count}
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

  const items = data.map((json) => new CartProduct(json));

  const overlayStyles = {
    ...(!isMobile && {
      justifyItems: "end",
      justifyContent: "end",
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
    <Modal
      open={modal.visible}
      onClose={closeModal}
      overlayStyles={overlayStyles}
    >
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
              <CartItem
                // don't use item.id as key,
                //
                // When user clicks "Add to cart" button
                // We lie to the user that the item has been added to cart
                // In reality we created fake item in the cart on the client side
                // as though the server did it.
                // So the user doesn't have to wait until server responds.
                // In the background we send request to the server to add product to cart for real
                // Until server responds we render fake cart item with fake id
                // If we use fake id as key for CartItem component,
                // then the CartItem component will be fully remounted when server responds, loosing its state.
                // we want to avoid that, so we use productId + variantId as key
                key={[item.productId, item.variantId].filter(Boolean).join(".")}
                item={item}
              />
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
    </Modal>
  );
});
