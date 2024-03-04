import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import {
  IGetCartRes,
  IGetProductsRes,
  IGetWishlistRes,
  SortKey,
} from "src/api/types";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { MenuLayout } from "~domains/product/components/MenuLayout";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";
import { CategorySlug } from "~domains/category/constants";
import { useTypedSearchParams } from "react-router-typesafe-routes/dom";
import { ROUTES } from "~routes";
import { Page } from "~components/Page";

const DEFAULT_PRODUCTS_LIMIT = 2000;

export const WishlistPage = observer(() => {
  const [searchParams] = useTypedSearchParams(ROUTES.WISHLIST);
  const { q } = searchParams;
  const sort = searchParams.sort as SortKey;

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
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

  return (
    <Page>
      <MenuLayout categories={categories}>
        {isCartLoading ||
        isProductsLoading ||
        isCategoriesLoading ||
        isWishlistLoading ? (
          <ProductsGrid loading />
        ) : (
          <Wishlist cart={cart} products={products} wishlists={wishlists} />
        )}
      </MenuLayout>
    </Page>
  );
});

const Wishlist = ({
  products,
  wishlists,
  cart,
}: {
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
  cart: IGetCartRes;
}) => {
  const { t } = useTranslation();

  const items = products.data
    .map((json) => new Product(json))
    .filter((product) => {
      return product.isInWishlists(wishlists);
    });
  return (
    <ProductsGrid
      wishlists={wishlists}
      cart={cart}
      items={items}
      title={t("common.favorite")}
    />
  );
};

export const Component = WishlistPage;

Object.assign(Component, {
  displayName: "LazyWishlistPage",
});
