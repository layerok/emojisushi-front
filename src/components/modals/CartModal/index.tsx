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
  OptimisticCartTotalPrice,
} from "~components";

import { ReactElement, Suspense, useRef, useState } from "react";
import { useBreakpoint2 } from "~common/hooks";
import {
  Await,
  useAsyncValue,
  useFetcher,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CartProduct } from "~models";
import { LayoutRouteLoaderData } from "~layout/Layout";
import { useDeletingCartProducts } from "~hooks/use-layout-fetchers";
import { IGetCartRes } from "~api/types";
import {
  DeleteCartProductFormDataPayload,
  UpdateCartProductFormDataPayload,
} from "~domains/product/types";

const CartItem = ({ item }: { item: CartProduct }) => {
  const fetcher = useFetcher();
  const key = useRef(0);
  const newPrice = item.product.getNewPrice(item.variant)?.price_formatted;
  const oldPrice = item.product.getOldPrice(item.variant)?.price_formatted;
  const nameWithMods = item.nameWithMods;
  const { lang, spotSlug, citySlug } = useParams();
  const isDeleting = useDeletingCartProducts().includes(item.id);
  const [open, setOpen] = useState(false);
  let count = item.quantity;

  if (fetcher.formData) {
    count = +fetcher.formData.get("count");
  }

  const deleteCartItem = () => {
    const params: DeleteCartProductFormDataPayload = {
      cart_product_id: item.id + "",
    };
    fetcher.submit(params, {
      action: "/" + [lang, citySlug, spotSlug].join("/"),
      method: "delete",
    });
  };

  const updateCartItem = ({
    item,
    quantity,
  }: {
    item: CartProduct;
    quantity: number;
  }) => {
    const params: UpdateCartProductFormDataPayload = {
      product_id: item.product.id + "",
      quantity: quantity + "",
      count: `${count + quantity}`,
      price: item.product.getNewPrice(item.variant).price + "",
      cart_product_id: item.id + "",
    };

    if (item.variant) {
      params.variant_id = item.variant.id + "";
    }

    fetcher.submit(params, {
      action: `/${lang}/${citySlug}/${spotSlug}`,
      method: "post",
    });
  };

  const handleAdd = (item: CartProduct) => {
    return async (quantity) => {
      if (count + quantity <= 0) {
        key.current++;
        setOpen(true);
      } else {
        updateCartItem({
          item: item,
          quantity,
        });
      }
    };
  };
  const { t } = useTranslation();

  if (isDeleting) {
    return null;
  }

  return (
    <S.Item>
      <S.Item.RemoveIcon>
        <ConfirmActionPopover
          // Hack: I'am changing key to remount component to reset 'initiallyOpen' state
          key={key.current}
          initiallyOpen={open}
          onConfirm={({ close }) => {
            deleteCartItem();
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
                handleAdd(item)(1);
              }}
              handleDecrement={() => {
                handleAdd(item)(-1);
              }}
              count={count}
            />
          </S.Item.Counter>
          <Price newPrice={newPrice} oldPrice={oldPrice} />
        </FlexBox>
      </S.Item.Info>
    </S.Item>
  );
};

export const CartModal = ({ children }) => {
  const { cart } = useRouteLoaderData("layout") as LayoutRouteLoaderData;
  // todo: console.log('check why this component rerenders on window scroll');
  return (
    <Suspense fallback={children}>
      <Await resolve={cart}>
        <AwaitedCartModal>{children}</AwaitedCartModal>
      </Await>
    </Suspense>
  );
};

const AwaitedCartModal = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();

  const { lang, spotSlug, citySlug } = useParams();
  // todo: add type
  const cart = useAsyncValue() as IGetCartRes;

  const { data, total } = cart;

  const { isMobile } = useBreakpoint2();
  const deletingCartProducts = useDeletingCartProducts();

  const { t } = useTranslation();

  // we don't unmount deleted cart product right away, because if we do so,
  // then cart product's fetcher will be aborted,
  // and therefore revalidation won't be triggered and we will see stale cart products
  const items = data.map((json) => new CartProduct(json));
  const optimisticItems = items.filter(
    (item) => !deletingCartProducts.includes(item.id)
  );

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
            {optimisticItems.length === 0 && <SushiSvg />}
            <S.Title>
              {optimisticItems.length === 0 && t("cartModal.empty")}
            </S.Title>
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
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </S.Items>

          {optimisticItems.length !== 0 && (
            <S.Footer>
              <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                <S.Sum>{t("cartModal.sum_order")}</S.Sum>
                <Price newPrice={<OptimisticCartTotalPrice items={items} />} />
              </FlexBox>
              <S.Button>
                <ButtonOutline
                  disabled={items.length === 0}
                  onClick={() => {
                    navigate(
                      "/" + [lang, citySlug, spotSlug, "checkout"].join("/")
                    );
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
