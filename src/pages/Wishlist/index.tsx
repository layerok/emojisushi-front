import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useSpotSlug } from "~hooks";
import { IGetWishlistResponse } from "~api/wishlist.api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { IGetProductsResponse } from "~api/menu.api";
import { Product } from "~models/Product";
import { queryClient } from "~query-client";
import { Suspense } from "react";
import { FlexBox } from "~components/FlexBox";
import { Sidebar } from "~pages/Category/Sidebar";
import { useLoadCategories } from "~hooks/use-load-categories";
import { CategoriesStore } from "~stores/categories.store";
import { productsQuery, wishlistsQuery } from "~queries";

// todo: fix layout for wishlist

export const Wishlist = observer(() => {
  const { items }: WishlistLoaderResolvedDeferredData = useLoaderData() as any;
  const [products, wishlists] = items;

  return (
    <FlexBox>
      <InternalSidebar />
      <Suspense>
        <Await resolve={Promise.all([products, wishlists])}>
          <AwaitedWishlist />
        </Await>
      </Suspense>
    </FlexBox>
  );
});

export const InternalSidebar = () => {
  const spotSlug = useSpotSlug();
  const categoriesFetcher = useLoadCategories();

  const categoriesStore = new CategoriesStore(
    categoriesFetcher.data?.categories?.data || []
  );
  const publishedCategories = categoriesStore.getPublishedItems(spotSlug);

  if (categoriesFetcher.state === "loading" && !categoriesFetcher.data) {
    return <Sidebar showSkeleton />;
  }

  return <Sidebar categories={publishedCategories} />;
};

const AwaitedWishlist = () => {
  const { t } = useTranslation();

  const handleLoadMore = () => {
    // todo: implement load more
  };
  const spotSlug = useSpotSlug();

  const [productsQuery, wishlistQuery] = useAsyncValue() as [
    IGetProductsResponse,
    IGetWishlistResponse
  ];

  const items = productsQuery.data
    .map((json) => new Product(json))
    .filter((product) => !product.isHiddenInSpot(spotSlug))
    .filter((product) => {
      return product.isInWishlists(wishlistQuery);
    });
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

export type WishlistLoaderResolvedDeferredData = {
  items: [IGetProductsResponse, IGetWishlistResponse];
};

export const wishlistLoader = async ({ params }) => {
  const productQuery = productsQuery({
    category_slug: "menu",
    search: null,
  });

  const productsPromise =
    queryClient.getQueryData(productQuery.queryKey) ??
    queryClient.fetchQuery(productQuery);
  const wishlistsPromise =
    queryClient.getQueryData(wishlistsQuery.queryKey) ??
    queryClient.fetchQuery(wishlistsQuery);

  return defer({
    items: [productsPromise, wishlistsPromise],
  } as WishlistLoaderResolvedDeferredData);
};

export const loader = wishlistLoader;
