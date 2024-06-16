import { ProductsGrid } from "~components";
import { useQuery } from "@tanstack/react-query";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { ClientProduct, IProduct, SortKey } from "src/api/types";
import { CategorySlug } from "~domains/category/constants";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";
import levenshtein from "js-levenshtein";

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
      category_slug: CategorySlug.Menu,
      sort: sort,
      limit: 9999,
    })
  );

  const computeBestScore = (product: IProduct): ClientProduct => {
    const words = product.name.split(" ");
    const searchWords = q.split(" ");

    let bestScore = 1000;

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < searchWords.length; j++) {
        const score = levenshtein(searchWords[j], words[i]);
        if (bestScore > score) {
          bestScore = score;
        }
      }
    }

    return { ...product, best_score: bestScore };
  };

  const belongsToCategory = (product: IProduct) =>
    !!product.categories.find((category) => category.slug === categorySlug);

  const noopBestScore = (product: IProduct): ClientProduct => {
    return { ...product, best_score: 0 };
  };

  const items = (productQueryRes?.data || [])
    .map(q ? computeBestScore : noopBestScore)
    .filter((product) => product.best_score < 3)
    .filter(q ? Boolean : belongsToCategory)
    .sort((a, b) => a.best_score - b.best_score)
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
