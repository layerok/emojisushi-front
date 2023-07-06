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

import { ReactElement, useRef, useState } from "react";
import { useBreakpoint2 } from "~common/hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartProduct } from "~models";
import { ICartProduct, IGetCartRes } from "~api/types";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { useMutation } from "@tanstack/react-query";
import { cartApi } from "~api";
import { formatUAHPrice } from "~utils/price.utils";
import { arrImmutableDeleteAt, arrImmutableReplaceAt } from "~utils/arr.utils";

const CartItem = ({
  item,
  onDelete,
}: {
  item: CartProduct;
  onDelete: (item: CartProduct) => void;
}) => {
  const key = useRef(0);
  const newPrice = item.product.getNewPrice(item.variant)?.price_formatted;
  const oldPrice = item.product.getOldPrice(item.variant)?.price_formatted;
  const nameWithMods = item.nameWithMods;
  const [open, setOpen] = useState(false);

  const updateCartProduct = useMutation({
    mutationFn: ({
      item,
      quantity,
    }: {
      item: CartProduct;
      quantity: number;
    }) => {
      return cartApi.addProduct({
        product_id: item.product.id,
        quantity,
        variant_id: item?.variant?.id,
      });
    },
    onMutate: async ({ item, quantity }) => {
      await queryClient.cancelQueries(cartQuery);

      const previousCart = queryClient.getQueryData(cartQuery.queryKey);

      queryClient.setQueryData(cartQuery.queryKey, (old: IGetCartRes) => {
        const cartProduct = old.data.find(
          (cartProduct) => cartProduct.product.id === item.product.id
        );

        if (cartProduct) {
          const index = old.data.indexOf(cartProduct);
          const optimisticQuantity = cartProduct.quantity + quantity;

          if (optimisticQuantity > 0) {
            const optimisticCartProduct = {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
            const optimisticCartProducts = arrImmutableReplaceAt(
              old.data,
              index,
              optimisticCartProduct
            );
            const optimisticTotal = optimisticCartProducts.reduce(
              (acc, cartProduct: ICartProduct) => {
                return (
                  acc + (cartProduct.quantity * cartProduct.price.UAH) / 100
                );
              },
              0
            );

            return {
              ...old,
              data: optimisticCartProducts,
              total: formatUAHPrice(optimisticTotal),
              totalQuantity: optimisticCartProducts.reduce(
                (acc, item: ICartProduct) => acc + item.quantity,
                0
              ),
            };
          } else {
            onDelete(item);
            const optimisticCartProducts = arrImmutableDeleteAt(
              old.data,
              index
            );
            const optimisticTotal = optimisticCartProducts.reduce(
              (acc, cartProduct: ICartProduct) => {
                return (
                  acc + (cartProduct.quantity * cartProduct.price.UAH) / 100
                );
              },
              0
            );

            return {
              ...old,
              data: optimisticCartProducts,
              total: formatUAHPrice(optimisticTotal),
              totalQuantity: optimisticCartProducts.reduce(
                (acc, item: ICartProduct) => acc + item.quantity,
                0
              ),
            };
          }
        }

        return old;
      });

      return {
        previousCart,
      };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
  });

  const changeCartItemQuantity = async (item: CartProduct, quantity) => {
    if (item.quantity + quantity <= 0) {
      key.current++;
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
      <S.Item.RemoveIcon>
        <ConfirmActionPopover
          // Hack: I'am changing key to remount component to reset 'initiallyOpen' state
          key={key.current}
          initiallyOpen={open}
          onConfirm={({ close }) => {
            updateCartProduct.mutate({
              item: item,
              quantity: -item.quantity,
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
      </S.Item.RemoveIcon>
      <S.Item.Img src={item.product.mainImage}>
        {!item.product.mainImage && (
          <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
            <LogoSvg />
          </SvgIcon>
        )}
      </S.Item.Img>
      <S.Item.Info>
        <S.Item.Name title={nameWithMods}>{nameWithMods}</S.Item.Name>
        <FlexBox justifyContent={"space-between"} alignItems={"flex-end"}>
          <S.Item.Counter>
            <LightCounter
              handleIncrement={() => {
                changeCartItemQuantity(item, 1);
              }}
              handleDecrement={() => {
                changeCartItemQuantity(item, -1);
              }}
              count={item.quantity}
            />
          </S.Item.Counter>
          <Price newPrice={newPrice} oldPrice={oldPrice} />
        </FlexBox>
      </S.Item.Info>
    </S.Item>
  );
};

export const CartModal = ({
  children,
  cart,
  onEmpty,
}: {
  cart: IGetCartRes;
  children: ReactElement;
  onEmpty?: () => void;
}) => {
  const navigate = useNavigate();

  const { data } = cart;

  const { isMobile } = useBreakpoint2();

  const { t } = useTranslation();

  // we don't unmount deleted cart product right away, because if we do so,
  // then cart product's fetcher will be aborted,
  // and therefore revalidation won't be triggered and we will see stale cart products
  const items = data.map((json) => new CartProduct(json));

  const overlayStyles = {
    justifyItems: isMobile ? "center" : "end",
    alignItems: isMobile ? "center" : "start",
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: 999999,
  };

  // max cart items wrapper height is 500px and min is 300px
  // 252px is sum of heights another element in cart modal
  const finalHeight = Math.max(Math.min(500 - 252, 500), 300);

  return (
    <BaseModal
      overlayStyles={overlayStyles}
      render={({ close }) => (
        <S.Wrapper>
          <S.CloseIcon>
            <CloseModalIcon close={close} />
          </S.CloseIcon>

          <S.EmptyCartImgContainer>
            {items.length === 0 && <SushiSvg />}
            <S.Title>{items.length === 0 && t("cartModal.empty")}</S.Title>
          </S.EmptyCartImgContainer>

          <S.Items>
            <div
              style={{
                minHeight: 362 + "px",
                maxHeight: finalHeight + "px",
                overflowY: "auto",
              }}
            >
              {items.map((item, i) => (
                <CartItem
                  onDelete={() => {
                    if (items.length === 1) {
                      onEmpty?.();
                    }
                  }}
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </S.Items>

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
                    navigate("/checkout");
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
    >
      {children}
    </BaseModal>
  );
};
