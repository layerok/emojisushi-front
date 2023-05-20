import * as S from "./styled";
import { Price, AddToCartButton } from "~components";
import { Product, Variant, CartProduct } from "~models";
import { useFetcher, useParams } from "react-router-dom";

type TFooterProps = {
  loading?: boolean;
  product?: Product;
  variant?: Variant;
  cartProduct?: CartProduct;
};

export type UpdateCartProductFormDataPayload = {
  product_id: string;
  quantity: string;
  count: string;
  variant_id?: string;
  cart_product_id?: string;
  price: string;
};

export type DeleteCartProductFormDataPayload = {
  cart_product_id: string;
};

export const Footer = ({
  loading = false,
  product,
  variant,
  cartProduct,
}: TFooterProps) => {
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
    <S.Footer>
      <Price loading={loading} oldPrice={oldPrice} newPrice={newPrice} />

      <AddToCartButton
        loading={loading}
        count={count}
        handleAdd={handleAdd()}
      />
    </S.Footer>
  );
};
