import { ProductsGrid } from "~components";
import { useQuery } from "@tanstack/react-query";
import { cartQuery } from "~domains/cart/cart.query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";
import { useShowBinotel } from "~hooks/use-binotel";
import { catalogQuery } from "~domains/catalog/catalog.query";
import { processCatalog } from "~domains/catalog/catalog.utils";

export const ProductPage = () => {
  const { categorySlug } = useTypedParams(ROUTES.CATEGORY.SHOW);
  useShowBinotel();

  const [{ q: query, sort }] = useTypedSearchParams(ROUTES.CATEGORY.SHOW);

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: catalogData, isLoading: isCatalogLoading } =
    useQuery(catalogQuery);

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const items = processCatalog({
    sort,
    query,
    categories: catalogData?.categories ?? [],
    products: catalogData?.products ?? [],
    categorySlug,
  });

  const selectedCategory = (catalogData?.categories || []).find((category) => {
    return category.slug === categorySlug;
  });

  return isWishlistLoading || isCartLoading || isCatalogLoading ? (
    <ProductsGrid loading />
  ) : (
    <div style={{ flexGrow: 1 }}>
      <ProductsGrid
        wishlists={wishlists}
        cart={cart}
        title={selectedCategory?.name}
        loading={false}
        items={items}
      />
    </div>
  );
};

export const Component = ProductPage;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const ErrorBoundary = DefaultErrorBoundary;
