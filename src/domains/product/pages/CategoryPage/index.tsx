import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { FlexBox, ProductsGrid, RestaurantClosed } from "src/components";
import { Banner } from "./Banner";
import { useIsDesktop } from "src/common/hooks";
import { Sidebar } from "~components/Sidebar";
import { Suspense } from "react";
import { QueryClient } from "react-query";
import { queryClient } from "src/query-client";
import { Product } from "src/models";
import { wishlistApi } from "src/api";
import { categoriesQuery, wishlistsQuery } from "src/queries";
import { productsQuery } from "src/queries";
import {
  ICategory,
  IGetCartRes,
  IGetProductsRes,
  SortKey,
} from "src/api/types";
import { isClosed } from "src/utils/time.utils";
import { appConfig } from "src/config/app";
import { PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { CategoryPageLoaderData } from "~domains/product/types";
import { LayoutRouteLoaderData } from "~layout/Layout";
import { AwaitAll } from "~components/AwaitAll";

export const CategoryPage = () => {
  const isDesktop = useIsDesktop();

  // if (!selectedCategory && categories.length > 0) {
  //   return <Navigate to={categories[0].slug} />;
  // }

  const closed = isClosed({
    start: appConfig.workingHours[0],
    end: appConfig.workingHours[1],
  });

  const { products, categories } = useLoaderData() as CategoryPageLoaderData;
  const { cart, cities } = useRouteLoaderData(
    "layout"
  ) as LayoutRouteLoaderData;

  return (
    <>
      {false && <Banner />}
      <FlexBox flexDirection={isDesktop ? "row" : "column"}>
        <Suspense fallback={<Sidebar loading />}>
          <AwaitAll categories={categories} cities={cities}>
            {({ categories }) => <Sidebar categories={categories.data} />}
          </AwaitAll>
        </Suspense>
        <Suspense fallback={<ProductsGrid loading />}>
          <AwaitAll
            cities={cities}
            cart={cart}
            categories={categories}
            products={products}
          >
            {({ categories, cart, products }) => (
              <AwaitedProducts
                products={products}
                cart={cart}
                categories={categories.data}
              />
            )}
          </AwaitAll>
        </Suspense>
      </FlexBox>
      <RestaurantClosed open={closed} />
    </>
  );
};

export const AwaitedProducts = ({
  categories,
  cart,
  products,
}: {
  categories: ICategory[];
  cart?: IGetCartRes;
  products?: IGetProductsRes;
}) => {
  const { categorySlug, spotSlug, citySlug } = useParams();
  const publishedCategories = categories
    .filter((category) => category.published)
    .filter((category) => {
      return !category.hide_categories_in_spot
        .map((spot) => spot.slug)
        .includes(spotSlug);
    });

  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
  const navigation = useNavigation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const selectedCategory = publishedCategories.find((category) => {
    return category.slug === categorySlug;
  });
  const title = selectedCategory?.name;

  const handleLoadMore = () => {
    const nextLimit = +limit + PRODUCTS_LIMIT_STEP;
    navigate(
      "/" +
        [lang, citySlug, spotSlug, "category", categorySlug].join("/") +
        "?limit=" +
        nextLimit
    );
  };

  const items = products.data
    .map((product) => new Product(product))
    .filter((product: Product) => {
      return !product.isHiddenInSpot(spotSlug);
    });
  // todo: Total is not right because hidden products are also counted
  const total = products.total;

  // todo: show skeleton while searching products
  return (
    <ProductsGrid
      cart={cart}
      handleLoadMore={handleLoadMore}
      title={title}
      loading={false}
      loadable={total > items.length}
      loadingMore={navigation.state === "loading"}
      items={items}
    />
  );
};

export const Component = CategoryPage;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const querifiedLoader = (queryClient: QueryClient) => {
  return ({ params, request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
    const q = url.searchParams.get("q");
    const sort = url.searchParams.get("sort") as SortKey;
    const productQuery = productsQuery({
      category_slug: q || !params.categorySlug ? "menu" : params.categorySlug,
      search: q,
      sort: sort,
      offset: 0,
      limit: +limit,
    });
    const query = categoriesQuery();

    return defer({
      categories:
        queryClient.getQueryData(query.queryKey) ??
        queryClient.fetchQuery(query),
      products:
        queryClient.getQueryData(productQuery.queryKey) ??
        queryClient.fetchQuery(productQuery),
      wishlists:
        queryClient.getQueryData(wishlistsQuery.queryKey) ??
        queryClient.fetchQuery(wishlistsQuery),
      q,
      sort,
    });
  };
};

export const loader = querifiedLoader(queryClient);

// todo: duplicated code, the same action is defined on the Wishlist page
export const categoryAction = async ({ request }) => {
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

export const action = categoryAction;
