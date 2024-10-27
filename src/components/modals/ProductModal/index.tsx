import React from "react";
import NiceModal from "@ebay/nice-modal-react";

import {
  Modal,
  ModalContent as BaseModalContent,
  Price,
  SkeletonWrap,
  SvgIcon,
  useModal,
} from "~components";
import * as S from "./styled";
import styled, { useTheme } from "styled-components";
import { Times } from "~assets/ui-icons";
import MyCounter from "~components/MyCounter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  DEFAULT_PRODUCTS_LIMIT,
  PRODUCT_ID_SEARCH_QUERY_PARAM,
  productsQuery,
} from "~domains/product/products.query";
import { cartQuery } from "~domains/cart/cart.query";
import Skeleton from "react-loading-skeleton";
import { findInCart } from "~components/ProductCard/utils";
import { useTranslation } from "react-i18next";
import { CategorySlug } from "~domains/category/constants";
import { useDebouncedAddProductToCart } from "~hooks/use-debounced-add-product-to-cart";
import { useModal as useNiceModal } from "~modal";
import { media } from "~common/custom-media";
import {
  getNewProductPrice,
  getOldProductPrice,
  getProductMainImage,
} from "~domains/product/product.utils";

export const ProductModal = NiceModal.create(() => {
  const modal = useNiceModal();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const { data, isLoading } = useQuery(
    productsQuery({
      category_slug: CategorySlug.Menu,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
  );

  const { data: cart } = useQuery(cartQuery);

  const navigate = useNavigate();

  const closeModal = () => {
    modal.remove();
    searchParams.delete(PRODUCT_ID_SEARCH_QUERY_PARAM);
    navigate(
      { search: searchParams.toString() },
      {
        preventScrollReset: true,
      }
    );
  };

  const product = (data?.data || []).find((products) => {
    return products.id === +searchParams.get(PRODUCT_ID_SEARCH_QUERY_PARAM);
  });

  const oldPrice =
    product && getOldProductPrice(product, undefined)?.price_formatted;
  const newPrice =
    product && getNewProductPrice(product, undefined)?.price_formatted;

  const cartProducts = cart?.data || [];

  const cartProduct = product && findInCart(cartProducts, product, undefined);
  const variant = cartProduct?.variant;
  const image = product && getProductMainImage(product);

  const count = cartProduct?.quantity || 0;

  const { createUpdateHandler } = useDebouncedAddProductToCart();

  return (
    <Modal open={modal.visible} onClose={closeModal}>
      <ModalContent>
        <ModalCloseButton />
        <S.Wrapper>
          <S.TopWrapper>
            <SkeletonWrap loading={isLoading}>
              <S.Image
                style={{
                  backgroundImage: `url("${image}")`,
                }}
              />
            </SkeletonWrap>
            <S.DescriptionWrapper>
              <S.ProductName>{product?.name || <Skeleton />}</S.ProductName>
              <S.Description>
                {product?.description_short != null ? (
                  product.description_short
                ) : (
                  <Skeleton />
                )}
              </S.Description>
              <S.ProductPrice>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Price newPrice={newPrice} oldPrice={oldPrice} />
                )}
              </S.ProductPrice>
            </S.DescriptionWrapper>
          </S.TopWrapper>
          <S.BotWrapper>
            <SkeletonWrap loading={isLoading}>
              {count ? (
                <MyCounter
                  count={count}
                  handleIncrement={createUpdateHandler({
                    delta: 1,
                    product: product,
                    variant: variant,
                    currentCount: count,
                  })}
                  handleDecrement={createUpdateHandler({
                    delta: -1,
                    product: product,
                    variant: variant,
                    currentCount: count,
                  })}
                />
              ) : (
                <S.CartButton
                  onClick={createUpdateHandler({
                    delta: 1,
                    product: product,
                    variant: variant,
                    currentCount: count,
                  })}
                >
                  {t("order.modal_order_btn")}
                </S.CartButton>
              )}
            </SkeletonWrap>
          </S.BotWrapper>
        </S.Wrapper>
      </ModalContent>
    </Modal>
  );
});

const ModalContent = styled(BaseModalContent)`
  ${media.lessThan("tablet")`
  border-radius: 0;
`}
`;

const ModalCloseButton = () => {
  const theme = useTheme();
  const { close: closeModal } = useModal();
  return (
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
  );
};
