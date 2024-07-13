import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
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
import { PRODUCT_SORTERS } from "~domains/product/product.constants";

const DEFAULT_PRODUCTS_LIMIT = 2000;

export const WishlistPage = observer(() => {
  const { t } = useTranslation();
  const [{ q, sort }] = useTypedSearchParams(ROUTES.CATEGORY.WISHLIST);

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });
  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);
  const { data: productRes, isLoading: isProductsLoading } = useQuery({
    ...productsQuery({
      category_slug: CategorySlug.Menu,
      search: q,
      limit: DEFAULT_PRODUCTS_LIMIT,
    }),
  });

  const rawProducts = productRes?.data || [];

  const sorter = PRODUCT_SORTERS[sort];
  const sortedProducts = sorter ? rawProducts.sort(sorter) : rawProducts;

  const items = sortedProducts
    .map((json) => new Product(json))
    .filter((product) => product.isInWishlists(wishlists));

  return isCartLoading ||
    isProductsLoading ||
    isCategoriesLoading ||
    isWishlistLoading ? (
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
