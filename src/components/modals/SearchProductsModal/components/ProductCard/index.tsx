import { CartProduct, Product } from "~models";
import { useDebouncedAddProductToCart } from "~hooks/use-debounced-add-product-to-cart";
import * as S from "./styled";
import { Button } from "~common/ui-components/Button/Button";
import React from "react";

export const ProductCard = ({
  product,
  cartItem,
}: {
  product: Product;
  cartItem?: CartProduct;
}) => {
  const { createUpdateHandler } = useDebouncedAddProductToCart();
  const addToCart = createUpdateHandler({
    delta: 1,
    variant: undefined,
    product: product,
    currentCount: cartItem?.quantity || 0,
  });
  const newPrice = product.getNewPrice(undefined)?.price_formatted;
  const oldPrice = product.getOldPrice(undefined)?.price_formatted;
  return (
    <S.Root key={product.id}>
      <div>
        <S.Image $src={product.mainImage} />
      </div>
      <S.SecondColumn>
        <div>
          <div>{product.name}</div>
        </div>

        <div>
          <div>{newPrice ?? oldPrice}</div>
          <S.ButtonContainer>
            {cartItem ? (
              <Button filled={true}>В кошику</Button>
            ) : (
              <Button onClick={addToCart}>Додати в кошик</Button>
            )}
          </S.ButtonContainer>
        </div>
      </S.SecondColumn>
    </S.Root>
  );
};
