import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { useSpotSlug } from "~hooks";
import WishlistApi, { IGetWishlistResponse } from "~api/wishlist.api";
import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import { IGetCategoriesResponse, IGetProductsResponse } from "~api/menu.api";
import { Product } from "~models/Product";
import { queryClient } from "~query-client";
import { Suspense } from "react";
import { FlexBox } from "~components/FlexBox";
import { Sidebar } from "~pages/Category/Sidebar";
import { CategoriesStore } from "~stores/categories.store";
import { categoriesQuery, productsQuery, wishlistsQuery } from "~queries";

// todo: fix layout for wishlist

export const Wishlist = observer(() => {
  const {
    products,
    wishlists,
    categories,
  }: WishlistLoaderResolvedDeferredData = useLoaderData() as any;

  return (
    <FlexBox>
      <Suspense fallback={<Sidebar showSkeleton />}>
        <Await resolve={categories}>
          <InternalSidebar />
        </Await>
      </Suspense>

      <Suspense fallback={<ProductsGrid showSkeleton />}>
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
});

export const InternalSidebar = () => {
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
      loadable={products.total > products.data.length}
      loading={false}
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
};

export const wishlistLoader = async ({ params }) => {
  const productQuery = productsQuery({
    category_slug: "menu",
    search: null,
    limit: null,
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
  } as WishlistLoaderResolvedDeferredData);
};

export const wishlistAction = async ({ request }) => {
  let formData = await request.formData();
  const product_id = formData.get("product_id");
  const quantity = formData.get("quantity");

  const res = await WishlistApi.addItem({
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
