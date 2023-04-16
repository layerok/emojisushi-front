import { Suspense } from "react";
import {
  Await,
  useAsyncValue,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { useIsMobile } from "~common/hooks";
import { CartProduct, Product } from "~models";
import * as S from "./styled";
import { Favorite } from "~components";
import Skeleton from "react-loading-skeleton";
import { IWishlist } from "~api/wishlist.api.types";

type FavoriteButtonProps = {
  cartProduct?: CartProduct;
  product?: Product;
  loading?: boolean;
};

export const FavoriteButton = ({
  cartProduct,
  product,
  loading = false,
}: FavoriteButtonProps) => {
  const { wishlists } = useLoaderData() as any;

  if (loading) {
    return (
      <S.Favorite>
        <Skeleton width={20} height={20} borderRadius={20} />
      </S.Favorite>
    );
  }

  return (
    <Suspense fallback={<Skeleton width={20} height={20} borderRadius={20} />}>
      <Await resolve={wishlists}>
        <AwaitedFavoriteButton product={product} cartProduct={cartProduct} />
      </Await>
    </Suspense>
  );
};

const AwaitedFavoriteButton = ({
  product,
  cartProduct,
}: {
  product: Product;
  cartProduct?: CartProduct;
}) => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 33 : 25;

  // todo: saving count is useless for now, we don't use it anyhow
  const count = cartProduct?.quantity || 0;

  const fetcher = useFetcher();
  const wishlists = useAsyncValue() as IWishlist[];

  let favorite = product.isInWishlists(wishlists || []);

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
      <Favorite width={iconSize + "px"} isFavorite={favorite} />
    </S.Favorite>
  );
};
