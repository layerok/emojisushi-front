import * as S from "./styled";
import { EqualHeightElement } from "react-equal-height";
import { useMemo, useState } from "react";
import { CartProduct, Product } from "~models";
import {
  Image,
  Weight,
  Modificators,
  Ingredients,
  FavoriteButton,
  Name,
} from "./components";
import { TProductCardProps } from "./types";
import { findInCart } from "./utils";
import { useAsyncValues } from "~components/AwaitAll";
import { Price } from "~components/Price";
import { useFetcher, useParams } from "react-router-dom";
import { AddToCartButton } from "~components/buttons";
import { UpdateCartProductFormDataPayload } from "~domains/product/types";

export const ProductCard = ({
  product,
  loading = false,
  cart,
}: TProductCardProps) => {
  const cartProducts = cart?.data.map((json) => new CartProduct(json)) || [];
  const { wishlists } = useAsyncValues() as any;

  const initialModificatorsState = product?.modGroups.reduce((acc, group) => {
    return {
      ...acc,
      [group.property.id]: +group.property.options[0].poster_id,
    };
  }, {});

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

  const favorite = product?.isInWishlists(wishlists || []);

  const oldPrice = product?.getOldPrice(variant)?.price_formatted;
  const newPrice = product?.getNewPrice(variant)?.price_formatted;

  const fetcher = useFetcher();

  const { lang, spotSlug, citySlug } = useParams();

  let count = cartProduct?.quantity || 0;

  if (fetcher.formData) {
    count = +fetcher.formData.get("count");
  }

  const handleAdd = () => {
    return async (quantity: number) => {
      const params: UpdateCartProductFormDataPayload = {
        product_id: product.id + "",
        quantity: quantity + "",
        count: `${count + quantity}`,
        price: product.getNewPrice(variant).price + "",
      };
      if (variant) {
        params.variant_id = variant.id + "";
      }
      if (cartProduct) {
        params.cart_product_id = cartProduct.id + "";
      }
      fetcher.submit(params, {
        action: "/" + [lang, citySlug, spotSlug].join("/"),
        method: "post",
      });
    };
  };

  return (
    <S.Wrapper>
      <FavoriteButton
        loading={loading}
        cartProduct={cartProduct}
        product={product}
        favorite={favorite}
      />
      <Image product={product} loading={loading} />

      <EqualHeightElement name={"product-name"}>
        <Name loading={loading} product={product} />
        <Modificators
          loading={loading}
          product={product}
          modificators={modificators}
          setModificators={setModificators}
        />
      </EqualHeightElement>
      <EqualHeightElement name={"description"}>
        <S.Description>
          <Weight product={product} loading={loading} />
          <Ingredients product={product} loading={loading} />
        </S.Description>
      </EqualHeightElement>

      <S.Footer>
        <Price loading={loading} oldPrice={oldPrice} newPrice={newPrice} />
        <AddToCartButton
          loading={loading}
          count={count}
          handleAdd={handleAdd()}
        />
      </S.Footer>
    </S.Wrapper>
  );
};
