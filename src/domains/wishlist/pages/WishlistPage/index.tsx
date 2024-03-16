import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import { SortKey } from "src/api/types";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { CategorySlug } from "~domains/category/constants";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "~routes";

const DEFAULT_PRODUCTS_LIMIT = 2000;

export const WishlistPage = observer(() => {
  const { t } = useTranslation();
  const [searchParams] = useTypedSearchParams(ROUTES.CATEGORY.WISHLIST);
  const { q } = searchParams;
  const sort = searchParams.sort as SortKey;

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });
  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);
  const { data: products, isLoading: isProductsLoading } = useQuery({
    ...productsQuery({
      category_slug: CategorySlug.Menu,
      search: q,
      limit: DEFAULT_PRODUCTS_LIMIT,
      sort: sort,
    }),
  });

  return isCartLoading ||
    isProductsLoading ||
    isCategoriesLoading ||
    isWishlistLoading ? (
    <ProductsGrid loading />
  ) : (
    <ProductsGrid
      wishlists={wishlists}
      cart={cart}
      items={products.data
        .map((json) => new Product(json))
        .filter((product) => {
          return product.isInWishlists(wishlists);
        })}
      title={t("common.favorite")}
    />
  );
});

export const Component = WishlistPage;

Object.assign(Component, {
  displayName: "LazyWishlistPage",
});
