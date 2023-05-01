import { ProductsGrid } from "~components";
import { useTranslation } from "react-i18next";
import { wishlistApi } from "src/api";
import {
  defer,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import {
  IGetCartRes,
  IGetProductsRes,
  IGetWishlistRes,
  SortKey,
} from "src/api/types";
import { Product } from "src/models";
import { queryClient } from "src/query-client";
import { Suspense } from "react";
import { categoriesQuery, productsQuery, wishlistsQuery } from "src/queries";
import { LayoutRouteLoaderData } from "~layout/Layout";
import { AwaitAll } from "~components/AwaitAll";
import { WishlistPageLoaderData } from "~domains/wishlist/types";
import { MenuLayout } from "~domains/product/components/MenuLayout";

// todo: fix layout for wishlist
// todo: optimisticly filter out wishlisted products

export const WishlistPage = () => {
  const { products, wishlists, categories } =
    useLoaderData() as WishlistPageLoaderData;

  const { cart } = useRouteLoaderData("layout") as LayoutRouteLoaderData;

  return (
    <MenuLayout>
      <Suspense fallback={<ProductsGrid loading />}>
        <AwaitAll
          cart={cart}
          categories={categories}
          wishlists={wishlists}
          products={products}
        >
          {({ cart, categories, wishlists, products }) => (
            <Wishlist cart={cart} products={products} wishlists={wishlists} />
          )}
        </AwaitAll>
      </Suspense>
    </MenuLayout>
  );
};

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
      cart={cart}
      items={items}
      handleLoadMore={handleLoadMore}
      title={t("common.favorite")}
    />
  );
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
  } as WishlistPageLoaderData);
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
