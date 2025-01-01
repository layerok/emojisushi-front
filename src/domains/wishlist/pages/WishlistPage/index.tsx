import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import { cartQuery } from "~domains/cart/cart.query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "~routes";
import { useShowBinotel } from "~hooks/use-binotel";
import { catalogQuery } from "~domains/catalog/catalog.query";
import { processCatalog } from "~domains/catalog/catalog.utils";

export const WishlistPage = observer(() => {
  const { t } = useTranslation();
  const [{ q, sort }] = useTypedSearchParams(ROUTES.CATEGORY.WISHLIST);
  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: catalogData, isLoading: isCatalogLoading } =
    useQuery(catalogQuery);

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  useShowBinotel();

  const items = processCatalog({
    sort,
    query: q,
    categories: catalogData?.categories ?? [],
    products: catalogData?.products ?? [],
    wishlists,
  });

  return isCartLoading || isCatalogLoading || isWishlistLoading ? (
    <ProductsGrid loading />
  ) : (
    <ProductsGrid
      wishlists={wishlists}
      cart={cart}
      items={items}
      title={t("common.favorite")}
    />
  );
});

export const Component = WishlistPage;

Object.assign(Component, {
  displayName: "LazyWishlistPage",
});
