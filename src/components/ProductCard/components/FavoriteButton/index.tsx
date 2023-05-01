import { useFetcher } from "react-router-dom";
import { CartProduct, Product } from "~models";
import * as S from "./styled";
import { Favorite } from "~components";

type FavoriteButtonProps = {
  cartProduct?: CartProduct;
  product?: Product;
  loading?: boolean;
  favorite?: boolean;
};

export const FavoriteButton = ({
  cartProduct,
  product,
  loading = false,
  favorite,
}: FavoriteButtonProps) => {
  // todo: saving count is useless for now, we don't use it anyhow
  const count = cartProduct?.quantity || 0;

  const fetcher = useFetcher();

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  const handleToggleFavorite = () => {
    fetcher.submit(
      {
        quantity: count + "",
        product_id: product.id + "",
        favorite: favorite ? "false" : "true",
      },
      {
        method: "post",
      }
    );
  };

  return (
    <S.Favorite onClick={handleToggleFavorite}>
      <Favorite loading={loading} isFavorite={favorite} />
    </S.Favorite>
  );
};
