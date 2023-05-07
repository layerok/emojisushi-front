import * as S from "./styled";
import { EqualHeightElement } from "react-equal-height";
import { useMemo, useState } from "react";
import { CartProduct, Product } from "~models";
import {
  Image,
  Weight,
  Modificators,
  Ingredients,
  Footer,
  FavoriteButton,
  Name,
} from "./components";
import { TProductCardProps } from "./types";
import { findInCart } from "./utils";
import { useAsyncValues } from "~components/AwaitAll";

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
      [group.property.id]: group.property.options[0].poster_id,
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

      <Footer
        cartProduct={cartProduct}
        product={product}
        variant={variant}
        loading={loading}
      />
    </S.Wrapper>
  );
};
