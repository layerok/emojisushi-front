import { ProductsGrid, FlexBox } from "~components";
import { useTranslation } from "react-i18next";
import { wishlistApi } from "src/api";
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import {
  IGetCategoriesRes,
  IGetProductsRes,
  IGetWishlistRes,
  SortKey,
} from "src/api/types";
import { Product } from "src/models";
import { queryClient } from "src/query-client";
import { Suspense } from "react";
import { Sidebar } from "~components/Sidebar";
import { CategoriesStore } from "src/stores/categories.store";
import { categoriesQuery, productsQuery, wishlistsQuery } from "src/queries";
import { LayoutRouteLoaderData } from "~layout/Layout";

// todo: fix layout for wishlist

// todo: optimisticly filter out wishlisted products

export const WishlistPage = () => {
  const {
    products,
    wishlists,
    categories,
  }: WishlistLoaderResolvedDeferredData = useLoaderData() as any;

  const { cart } = useRouteLoaderData("layout") as LayoutRouteLoaderData;

  return (
    <FlexBox>
      <Suspense fallback={<Sidebar loading />}>
        <Await resolve={categories}>
          <AwaitedSidebar />
        </Await>
      </Suspense>

      <Suspense fallback={<ProductsGrid loading />}>
        <Await resolve={cart}>
          <Await resolve={products}>
            {(products) => (
              <Await resolve={wishlists}>
                {(wishlists) => (
                  <AwaitedWishlist products={products} wishlists={wishlists} />
                )}
              </Await>
            )}
          </Await>
        </Await>
      </Suspense>
    </FlexBox>
  );
};

export const AwaitedSidebar = () => {
  const { spotSlug } = useParams();

  const categories = useAsyncValue() as IGetCategoriesRes;

  const categoriesStore = new CategoriesStore(categories.data);
  const publishedCategories = categoriesStore.getPublishedItems(spotSlug);

  return <Sidebar categories={publishedCategories} />;
};

const AwaitedWishlist = ({
  products,
  wishlists,
}: {
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
}) => {
  const { t } = useTranslation();

  const handleLoadMore = () => {
    // todo: implement load more
  };
  const { spotSlug } = useParams();

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
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
  categories: IGetCategoriesRes;
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

export const Component = WishlistPage;

Object.assign(Component, {
  displayName: "LazyWishlistPage",
});

export const action = wishlistAction;

export const loader = wishlistLoader;
