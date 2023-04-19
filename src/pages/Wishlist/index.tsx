import { ProductsGrid, FlexBox } from "~components";
import { useTranslation } from "react-i18next";
import { useSpotSlug } from "~hooks";
import { wishlistApi } from "~api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import {
  IGetCategoriesResponse,
  IGetProductsResponse,
  IGetWishlistResponse,
  SortKey,
} from "~api/types";
import { Product } from "~models";
import { queryClient } from "~query-client";
import { Suspense } from "react";
import { Sidebar } from "~pages/Category/Sidebar";
import { CategoriesStore } from "~stores/categories.store";
import { categoriesQuery, productsQuery, wishlistsQuery } from "~queries";

// todo: fix layout for wishlist

// todo: optimisticly filter out wishlisted products

export const Wishlist = () => {
  const {
    products,
    wishlists,
    categories,
  }: WishlistLoaderResolvedDeferredData = useLoaderData() as any;

  return (
    <FlexBox>
      <Suspense fallback={<Sidebar loading />}>
        <Await resolve={categories}>
          <AwaitedSidebar />
        </Await>
      </Suspense>

      <Suspense fallback={<ProductsGrid loading />}>
        <Await resolve={products}>
          {(products) => (
            <Await resolve={wishlists}>
              {(wishlists) => (
                <AwaitedWishlist products={products} wishlists={wishlists} />
              )}
            </Await>
          )}
        </Await>
      </Suspense>
    </FlexBox>
  );
};

export const AwaitedSidebar = () => {
  const spotSlug = useSpotSlug();

  const categories = useAsyncValue() as IGetCategoriesResponse;

  const categoriesStore = new CategoriesStore(categories.data);
  const publishedCategories = categoriesStore.getPublishedItems(spotSlug);

  return <Sidebar categories={publishedCategories} />;
};

const AwaitedWishlist = ({
  products,
  wishlists,
}: {
  products: IGetProductsResponse;
  wishlists: IGetWishlistResponse;
}) => {
  const { t } = useTranslation();

  const handleLoadMore = () => {
    // todo: implement load more
  };
  const spotSlug = useSpotSlug();

  const items = products.data
    .map((json) => new Product(json))
    .filter((product) => !product.isHiddenInSpot(spotSlug))
    .filter((product) => {
      return product.isInWishlists(wishlists);
    });
  return (
    <ProductsGrid
      loadable={false}
      items={items}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
};

export type WishlistLoaderResolvedDeferredData = {
  products: IGetProductsResponse;
  wishlists: IGetWishlistResponse;
  categories: IGetCategoriesResponse;
  q: string | undefined;
};

export const wishlistLoader = async ({ params, request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const sort = url.searchParams.get("sort") as SortKey;
  // todo: checkou default limit, maybe make it unlimited by default
  const productQuery = productsQuery({
    category_slug: "menu",
    search: q,
    limit: 2000,
    sort: sort,
  });

  // todo: rename categoriesQuery function
  const catQuery = categoriesQuery();

  const productsPromise =
    queryClient.getQueryData(productQuery.queryKey) ??
    queryClient.fetchQuery(productQuery);
  const wishlistsPromise =
    queryClient.getQueryData(wishlistsQuery.queryKey) ??
    queryClient.fetchQuery(wishlistsQuery);
  const categoriesPromise =
    queryClient.getQueryData(catQuery.queryKey) ??
    queryClient.fetchQuery(catQuery);

  return defer({
    products: productsPromise,
    wishlists: wishlistsPromise,
    categories: categoriesPromise,
    q,
    sort,
  } as WishlistLoaderResolvedDeferredData);
};

export const wishlistAction = async ({ request }) => {
  let formData = await request.formData();
  const product_id = formData.get("product_id");
  const quantity = formData.get("quantity");

  const res = await wishlistApi.addItem({
    product_id,
    quantity,
  });
  queryClient.setQueryData(wishlistsQuery.queryKey, res.data);
  return res.data;
};

export const Component = Wishlist;
Object.assign(Component, {
  displayName: "LazyWishlist",
});

export const action = wishlistAction;

export const loader = wishlistLoader;
