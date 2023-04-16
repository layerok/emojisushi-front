import { useEffect } from "react";
import { FetcherWithComponents, useFetcher, useParams } from "react-router-dom";
import { IGetWishlistResponse } from "~api/wishlist.api.types";
import { useIsMobile } from "~common/hooks";
import { CartProduct, Product } from "~models";
import * as S from "./styled";
import { WishlistLoaderResolvedDeferredData } from "~pages/Wishlist";
import { Favorite } from "~components";

type FavoriteButtonProps = {
  cartProduct?: CartProduct;
  product?: Product;
  fetcher: FetcherWithComponents<IGetWishlistResponse>;
  loading?: boolean;
};

export const FavoriteButton = ({
  cartProduct,
  product,
  fetcher,
  loading = false,
}: FavoriteButtonProps) => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 33 : 25;
  const count = cartProduct?.quantity || 0;
  const loadFetcher =
    useFetcher() as FetcherWithComponents<WishlistLoaderResolvedDeferredData>;

  const { spotSlug, citySlug, lang } = useParams();

  const handleToggleFavorite = async () => {
    fetcher.submit(
      {
        quantity: count + "",
        product_id: product.id + "",
      },
      {
        method: "post",
      }
    );
  };

  useEffect(() => {
    // I don't sure about that fetcher, it will fetch products, categories, wishlists if they are stale.
    // don't sure if such overhead is needed
    // todo: need to rethink this
    loadFetcher.load(`/${lang}/${citySlug}/${spotSlug}/wishlist`);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <S.Favorite onClick={handleToggleFavorite}>
      <Favorite
        width={iconSize + "px"}
        isFavorite={product.isInWishlists(
          fetcher.data || loadFetcher.data?.wishlists || []
        )}
      />
    </S.Favorite>
  );
};
