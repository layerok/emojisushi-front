import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useSpot, useSpotSlug } from "~hooks";
import WishlistApi from "~api/wishlist.api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import MenuApi, { IGetProductsResponse } from "~api/menu.api";
import { Product } from "~models/Product";
import { queryClient } from "~query-client";
import { productsQuery } from "~pages/Category";
import { Suspense } from "react";

// todo: fix layout for wishlist

export const Wishlist = observer(() => {
  const { productsQuery } = useLoaderData() as any;

  return (
    <Suspense>
      <Await resolve={productsQuery}>
        <AwaitedWishlist />
      </Await>
    </Suspense>
  );
});

const AwaitedWishlist = () => {
  const { t } = useTranslation();

  const handleLoadMore = () => {
    // todo: implement load more
  };
  const spotSlug = useSpotSlug();

  const productsQuery = useAsyncValue() as IGetProductsResponse;
  const items = productsQuery.data
    .map((json) => new Product(json))
    .filter((product) => !product.isHiddenInSpot(spotSlug));
  return (
    <ProductsGrid
      loadable={productsQuery.total > productsQuery.data.length}
      loading={false}
      items={items}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
};

export const Component = Wishlist;
Object.assign(Component, {
  displayName: "LazyWishlist",
});

export const wishlistLoader = async ({ params }) => {
  const productQuery = productsQuery({
    category_slug: "menu",
    search: null,
  });
  return defer({
    // wishlists: await WishlistApi.getList(),
    productsQuery:
      queryClient.getQueryData(productQuery.queryKey) ??
      queryClient.fetchQuery(productQuery),
  });
};

export const loader = wishlistLoader;
