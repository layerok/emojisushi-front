import * as S from "./styled";
import { EqualHeightElement } from "react-equal-height";
import React, { useMemo, useState } from "react";
import { CartProduct, Product } from "~models";
import { Modificators } from "./components";
import { findInCart } from "./utils";
import { Price } from "~components/Price";
import { Button } from "~common/ui-components/Button/Button";
import { IGetCartRes, IGetWishlistRes } from "@layerok/emojisushi-js-sdk";
import {
  AnimatedTooltip,
  ButtonCounter,
  HeartSvg,
  InfoSvg,
  InfoTooltip,
  LogoSvg,
  SkeletonWrap,
  SvgIcon,
} from "~components";
import { useTranslation } from "react-i18next";
import { ReactComponent as ShoppingBag } from "src/assets/ui-icons/shopping-bag.svg";
import { StartAdornment } from "~common/ui-components/Button/StartAdornment";
import { ModalIDEnum } from "~common/modal.constants";
import { useShowModal } from "~modal";
import Skeleton from "react-loading-skeleton";
import { useAddToWishlist } from "~hooks/use-add-to-wishlist";
import { useTheme } from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PRODUCT_ID_SEARCH_QUERY_PARAM } from "~domains/product/products.query";

import { useDebouncedAddProductToCart } from "~hooks/use-debounced-add-product-to-cart";
import { IngredientsTooltipContent } from "~components/ProductCard/components/IngredientsTooltipContent";

type ProductCardProps = {
  product?: Product;
  loading?: boolean;
  cart?: IGetCartRes;
  wishlists?: IGetWishlistRes;
};

export const ProductCard = (props: ProductCardProps) => {
  const { product, loading = false, cart, wishlists } = props;
  const theme = useTheme();
  const showModal = useShowModal();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const cartProducts = cart?.data.map((json) => new CartProduct(json)) || [];

  const initialModificatorsState = product?.modGroups.reduce(
    (acc, group) => ({
      ...acc,
      [group.property.id]: +group.property.options[0].poster_id,
    }),
    {}
  );

  const [modificators, setModificators] = useState(initialModificatorsState);

  const getVariant = (product: Product) => {
    return product?.variants.find((variant) => {
      return !!Object.values(modificators).includes(variant.posterId);
    });
  };

  const variant = useMemo(() => getVariant(product), [product, modificators]);

  const cartProduct = useMemo(
    () => (product ? findInCart(cartProducts, product, variant) : undefined),
    [product, variant]
  );

  const count = cartProduct?.quantity || 0;

  const { createUpdateHandler } = useDebouncedAddProductToCart();

  const favorite = product?.isInWishlists(wishlists || []);

  const oldPrice = product?.getOldPrice(variant)?.price_formatted;
  const newPrice = product?.getNewPrice(variant)?.price_formatted;

  const { mutate: addToWishlist } = useAddToWishlist();

  const [searchParams] = useSearchParams();

  const openDetailedProductModal = () => {
    showModal(ModalIDEnum.ProductModal);
    searchParams.set(PRODUCT_ID_SEARCH_QUERY_PARAM, product.id + "");
    navigate(
      { search: searchParams.toString() },
      {
        preventScrollReset: true,
      }
    );
  };
  const handleFavouriteButtonClick = () => {
    addToWishlist({
      product_id: product.id,
      quantity: count,
    });
  };

  return (
    <S.Wrapper>
      <S.FavouriteButtonWrapper>
        <SkeletonWrap borderRadius="100%" loading={loading}>
          <S.FavouriteButton onClick={handleFavouriteButtonClick}>
            <SvgIcon
              clickable={true}
              width={"100%"}
              color={favorite ? theme.colors.brand : "white"}
              hoverColor={theme.colors.brand}
            >
              <HeartSvg />
            </SvgIcon>
          </S.FavouriteButton>
        </SkeletonWrap>
      </S.FavouriteButtonWrapper>
      <SkeletonWrap loading={loading}>
        <S.Image onClick={openDetailedProductModal} src={product?.mainImage}>
          {!product?.mainImage && (
            <SvgIcon color={"white"} width={"80%"} style={{ opacity: 0.05 }}>
              <LogoSvg />
            </SvgIcon>
          )}
        </S.Image>
      </SkeletonWrap>
      <EqualHeightElement name={"product-name"}>
        <S.Name onClick={openDetailedProductModal}>
          {loading ? <Skeleton /> : product.name}
        </S.Name>
        <Modificators
          loading={loading}
          product={product}
          modificators={modificators}
          setModificators={setModificators}
        />
      </EqualHeightElement>
      <EqualHeightElement name={"description"}>
        <S.Description>
          <SkeletonWrap loading={loading}>
            <InfoTooltip label={t("menu.weightComment")}>
              <S.Weight>
                {product?.weight !== 0 ? product?.weight + "г" : ""}
                {product?.weight !== 0 && (
                  <S.WeightTooltipMarker>?</S.WeightTooltipMarker>
                )}
              </S.Weight>
            </InfoTooltip>
          </SkeletonWrap>
          <SkeletonWrap borderRadius="100%" loading={loading}>
            <AnimatedTooltip
              placement={"bottom-start"}
              label={
                <IngredientsTooltipContent items={product?.ingredients || []} />
              }
            >
              <SvgIcon width="25px" color={"#999"}>
                <InfoSvg />
              </SvgIcon>
            </AnimatedTooltip>
          </SkeletonWrap>
        </S.Description>
      </EqualHeightElement>

      <S.Footer>
        <Price loading={loading} oldPrice={oldPrice} newPrice={newPrice} />
        {count ? (
          <ButtonCounter
            handleIncrement={createUpdateHandler({
              delta: 1,
              product,
              variant,
              currentCount: count,
            })}
            handleDecrement={createUpdateHandler({
              delta: -1,
              product,
              variant,
              currentCount: count,
            })}
            count={count}
          />
        ) : (
          <Button
            style={{
              width: 130,
            }}
            startAdornment={
              <StartAdornment>
                <ShoppingBag />
              </StartAdornment>
            }
            showSkeleton={loading}
            onClick={createUpdateHandler({
              delta: 1,
              product,
              variant,
              currentCount: count,
            })}
          >
            {t("order.order_btn")}
          </Button>
        )}
      </S.Footer>
    </S.Wrapper>
  );
};
