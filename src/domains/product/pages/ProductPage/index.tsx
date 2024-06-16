import { ProductsGrid } from "~components";
import { useQuery } from "@tanstack/react-query";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  DEFAULT_PRODUCTS_LIMIT,
  fuzzySearch,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { IProduct, SortKey } from "src/api/types";
import { CategorySlug } from "~domains/category/constants";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";

export const ProductPage = () => {
  const { categorySlug } = useTypedParams(ROUTES.CATEGORY.SHOW);

  const [{ q, sort }] = useTypedSearchParams(ROUTES.CATEGORY.SHOW);

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categoryQueryRes, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const { data: productQueryRes, isLoading: isProductsLoading } = useQuery(
    productsQuery({
      category_slug: CategorySlug.Menu,
      sort: sort as SortKey,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
  );

  const belongsToCategory = (product: IProduct) =>
    !!product.categories.find((category) => category.slug === categorySlug);

  // todo: filter products from hidden categories on the server
  const filterProductsFromHiddenCategories = (product: IProduct) => {
    return !!product.categories.find((category) =>
      (categoryQueryRes?.data || [])
        .map((category) => category.slug)
        .includes(category.slug)
    );
  };

  const rawItems = (productQueryRes?.data || []).filter(
    q ? filterProductsFromHiddenCategories : belongsToCategory
  );
  const items = fuzzySearch(rawItems, q).map((product) => new Product(product));

  const selectedCategory = (categoryQueryRes?.data || []).find((category) => {
    return category.slug === categorySlug;
  });

  return isWishlistLoading ||
    isCartLoading ||
    isProductsLoading ||
    isCategoriesLoading ? (
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
