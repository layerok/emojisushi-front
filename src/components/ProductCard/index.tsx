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
import { findInCart } from "./utils";
import { Price } from "~components/Price";
import { Button } from "~common/ui-components/Button/Button";
import { IGetCartRes, IGetWishlistRes } from "~api/types";
import { ButtonCounter } from "~components";
import { useTranslation } from "react-i18next";
import { ReactComponent as ShoppingBag } from "src/assets/ui-icons/shopping-bag.svg";
import { useUpdateProduct } from "~hooks/use-update-product";
import { useAddProduct } from "~hooks/use-add-product";

type ProductCardProps = {
  product?: Product;
  loading?: boolean;
  cart?: IGetCartRes;
  wishlists?: IGetWishlistRes;
};

export const ProductCard = (props: ProductCardProps) => {
  const { product, loading = false, cart, wishlists } = props;

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

  const favorite = product?.isInWishlists(wishlists || []);

  const oldPrice = product?.getOldPrice(variant)?.price_formatted;
  const newPrice = product?.getNewPrice(variant)?.price_formatted;

  const { mutate: updateProductQuantity } = useUpdateProduct();
  const { mutate: addProductToCart } = useAddProduct();

  const count = cartProduct?.quantity || 0;

  const handleQuantityUpdate = (quantity: number) => {
    if (count) {
      updateProductQuantity({
        variant: variant,
        product: product,
        quantity: quantity,
      });
    } else {
      addProductToCart({
        variant: variant,
        product: product,
        quantity: quantity,
      });
    }
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
        {count ? (
          <ButtonCounter
            handleIncrement={() => handleQuantityUpdate(1)}
            handleDecrement={() => handleQuantityUpdate(-1)}
            count={count}
          />
        ) : (
          <Button
            style={{
              width: 130,
            }}
            startAdornment={<ShoppingBag />}
            showSkeleton={loading}
            onClick={() => handleQuantityUpdate(1)}
          >
            {t("order.order_btn")}
          </Button>
        )}
      </S.Footer>
    </S.Wrapper>
  );
};
