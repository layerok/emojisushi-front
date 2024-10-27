import { ProductsGrid } from "~components";
import { useQuery } from "@tanstack/react-query";
import {
  DEFAULT_PRODUCTS_LIMIT,
  productsQuery,
} from "~domains/product/products.query";
import { cartQuery } from "~domains/cart/cart.query";
import { categoriesQuery } from "~domains/category/categories.query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import { IProduct } from "@layerok/emojisushi-js-sdk";
import { CategorySlug } from "~domains/category/constants";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";
import { fuzzySearch as fuzzySearchBase } from "~utils/fuzzySearch";
import { PRODUCT_SORTERS } from "~domains/product/product.constants";

export const ProductPage = () => {
  const { categorySlug } = useTypedParams(ROUTES.CATEGORY.SHOW);

  const [{ q: query, sort }] = useTypedSearchParams(ROUTES.CATEGORY.SHOW);

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categoryQueryRes, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const { data: productQueryRes, isLoading: isProductsLoading } = useQuery(
    productsQuery({
      category_slug: CategorySlug.Menu,
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
    query ? filterProductsFromHiddenCategories : belongsToCategory
  );

  const searchedItems = query
    ? fuzzySearchBase(rawItems, query, (el) => el.name, {
        maxAllowedModifications: 1,
      })
    : rawItems;

  // todo: implement 'bestseller' and 'rating' sorters
  const sorter = PRODUCT_SORTERS[sort];
  const items = sorter ? searchedItems.sort(sorter) : searchedItems;

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
