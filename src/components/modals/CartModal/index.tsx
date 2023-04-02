import { BaseModal } from "../BaseModal";
import * as S from "./styled";
import { LightCounter } from "../../Counter";
import { FlexBox } from "../../FlexBox";
import { Price } from "../../Price";
import { CloseModalIcon } from "../CloseModalIcon";
import { CloseIcon } from "../../CloseIcon";
import { ButtonOutline } from "../../buttons/Button";
import { useWindowSize } from "react-use";
import { ReactElement, useEffect, useState } from "react";
import { useDebounce } from "~common/hooks/useDebounce";
import { useBreakpoint } from "~common/hooks/useBreakpoint";
import { ConfirmActionPopover } from "../../popovers/ConfirmActionPopover";
import { useFetcher, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { Loader } from "../../Loader";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "../../svg/SvgIcon";
import { LogoSvg } from "../../svg/LogoSvg";
import { SushiSvg } from "../../svg/SushiSvg";
import { CartProduct } from "~models/CartProduct";
import { useCity, useLang, useSpot } from "~hooks";
import CartApi from "~api/cart.api";
import { queryClient } from "~query-client";
import { cartQuery } from "~routes";
import { useQueries, useQuery } from "react-query";

const CartItem = observer(({ item }: { item: CartProduct }) => {
  const newPrice = item.product.getNewPrice(item.variant);
  const oldPrice = item.product.getOldPrice(item.variant);
  const nameWithMods = item.nameWithMods;

  const fetcher = useFetcher();

  const handleAdd = (product_id: number, variant_id: number | undefined) => {
    return async (quantity) => {
      await CartApi.addProduct({
        product_id,
        quantity,
        variant_id,
      });
      queryClient.invalidateQueries(cartQuery.queryKey);
    };
  };
  const { t } = useTranslation();
  return (
    <S.Item>
      <S.Item.RemoveIcon>
        <ConfirmActionPopover
          onConfirm={async ({ close }) => {
            await CartApi.removeCartProduct(item.id);
            queryClient.invalidateQueries(cartQuery.queryKey);
            close();
          }}
          onCancel={({ close }) => {
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
                handleAdd(item.productId, item.variantId)(1);
              }}
              handleDecrement={() => {
                handleAdd(item.productId, item.variantId)(-1);
              }}
              count={item.quantity}
            />
          </S.Item.Counter>
          <Price newPrice={newPrice} oldPrice={oldPrice} />
        </FlexBox>
      </S.Item.Info>
    </S.Item>
  );
});

export const CartModal = observer(({ children }) => {
  const { data, isLoading } = useQuery(cartQuery);

  // todo: console.log('check why this component rerenders on window scroll');

  if (!data || isLoading) {
    return children;
  }

  return <AwaitedCartModal>{children}</AwaitedCartModal>;
});

const AwaitedCartModal = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const [height, setHeight] = useState(windowSize.height);
  const city = useCity();
  const spot = useSpot();
  const lang = useLang();
  const query = useQuery(cartQuery) as any;

  const debounceHeight = useDebounce(() => {
    setHeight(windowSize.height);
  }, 300);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    debounceHeight();
  }, [windowSize.height]);
  const { t } = useTranslation();

  if (!query.data?.data) {
    return <>...loaidng</>;
  }

  const { data, total } = query.data.data;

  const items = data.map((json) => new CartProduct(json));
  //todo: implement loading logic
  const loading = false;

  const overlayStyles = {
    justifyItems: breakpoint === "mobile" ? "center" : "end",
    alignItems: breakpoint === "mobile" ? "center" : "start",
    background: "rgba(0, 0, 0, 0.4)",
    display: "grid",
    zIndex: 999999,
  };

  // max cart items wrapper height is 500px and min is 300px
  // 252px is sum of heights another element in cart modal
  const finalHeight = Math.max(Math.min(height - 252, 500), 300);

  return (
    <BaseModal
      overlayStyles={overlayStyles}
      render={({ close }) => (
        <S.Wrapper>
          <Loader loading={loading} />
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
                <CartItem key={i} item={item} />
              ))}
            </div>
          </S.Items>

          {items.length !== 0 && (
            <S.Footer>
              <FlexBox alignItems={"center"} justifyContent={"space-between"}>
                <S.Sum>{t("cartModal.sum_order")}</S.Sum>
                <Price newPrice={total} />
              </FlexBox>
              <S.Button>
                <ButtonOutline
                  disabled={items.length === 0}
                  onClick={() => {
                    navigate(
                      "/" + [lang, city.slug, spot.slug, "checkout"].join("/")
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
