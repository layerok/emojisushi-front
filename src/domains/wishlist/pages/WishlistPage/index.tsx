import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import { productsQuery } from "~domains/product/products.query";
import { cartQuery } from "~domains/cart/cart.query";
import { categoriesQuery } from "~domains/category/categories.query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { CategorySlug } from "~domains/category/constants";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "~routes";
import { PRODUCT_SORTERS } from "~domains/product/product.constants";
import { isProductInWishlists } from "~domains/product/product.utils";
import { useShowBinotel } from "~hooks/use-binotel";

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

  useShowBinotel();

  const rawProducts = productRes?.data || [];

  const sorter = PRODUCT_SORTERS[sort];
  const sortedProducts = sorter ? rawProducts.sort(sorter) : rawProducts;

  const items = sortedProducts.filter((product) =>
    isProductInWishlists(product, wishlists)
  );

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
