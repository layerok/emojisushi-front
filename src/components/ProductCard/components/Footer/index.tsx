import * as S from "./styled";
import { Price, AddToCartButton } from "~components";
import { Product, Variant, CartProduct } from "~models";
import { useFetcher } from "react-router-dom";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";

type TFooterProps = {
  loading?: boolean;
  product?: Product;
  variant?: Variant;
  cartProduct?: CartProduct;
};

export const Footer = ({
  loading = false,
  product,
  variant,
  cartProduct,
}: TFooterProps) => {
  const oldPrice = product?.getOldPrice(variant);
  const newPrice = product?.getNewPrice(variant);
  const fetcher = useFetcher();

  const lang = useLang();
  const spot = useSpotSlug();
  const city = useCitySlug();

  let count = cartProduct?.quantity || 0;

  if (fetcher.formData) {
    count = +fetcher.formData.get("count");
  }

  const handleAdd = () => {
    return async (quantity: number) => {
      fetcher.submit(
        {
          product_id: product.id + "",
          variant_id: variant?.id + "",
          quantity: quantity + "",
          count: `${count + quantity}`,
          type: "update",
        },
        {
          action: "/" + [lang, city, spot].join("/"),
          method: "post",
        }
      );
    };
  };

  return (
    <S.Footer>
      <Price loading={loading} oldPrice={oldPrice} newPrice={newPrice} />

      <AddToCartButton
        loading={loading}
        count={count}
        pending={false}
        handleAdd={handleAdd()}
      />
    </S.Footer>
  );
};
