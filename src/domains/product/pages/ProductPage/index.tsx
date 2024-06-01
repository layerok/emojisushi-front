import { ProductsGrid } from "~components";
import { useQuery } from "@tanstack/react-query";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { SortKey } from "src/api/types";
import { CategorySlug } from "~domains/category/constants";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";

export const ProductPage = observer(() => {
  const { categorySlug } = useTypedParams(ROUTES.CATEGORY.SHOW);

  const [searchParams] = useTypedSearchParams(ROUTES.CATEGORY.SHOW);
  const { q } = searchParams;

  const sort = searchParams.sort as SortKey;

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const { data: productQueryRes, isLoading: isProductsLoading } = useQuery(
    productsQuery({
      category_slug: q || CategorySlug.Menu,
      search: q,
      sort: sort,
      limit: 9999,
    })
  );

  const items = (productQueryRes?.data || [])
    .filter(
      (product) =>
        !!product.categories.find((category) => category.slug === categorySlug)
    )
    .map((product) => new Product(product));

  const selectedCategory = (categories?.data || []).find((category) => {
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
});

export const Component = ProductPage;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const ErrorBoundary = DefaultErrorBoundary;
