import { ProductsGrid } from "~components/ProductsGrid";
import { observer } from "mobx-react";
import {
  Await,
  Navigate,
  defer,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useProductsStore } from "~hooks/use-categories-store";
import { ProductsStore } from "~stores";
import { useCategoriesStore, useLang, useSpot } from "~hooks";
import { FlexBox } from "~components/FlexBox";
import { Banner } from "./Banner";
import { useIsDesktop } from "~common/hooks/useBreakpoint";
import { Sidebar } from "~pages/Category/Sidebar";
import { categoryLoaderIndex } from "~routes";
import { Suspense } from "react";
import { loader as categoryLoader } from "~pages/Category";

export const Category = observer(() => {
  const ProductsStore = useProductsStore();
  const { categorySlug, spotSlug, citySlug } = useParams();
  const lang = useLang();
  const CategoriesStore = useCategoriesStore();
  const selectedCategory = CategoriesStore.publishedCategories.find(
    (category) => {
      return category.slug === categorySlug;
    }
  );

  const navigate = useNavigate();

  const title = selectedCategory?.name;
  const isDesktop = useIsDesktop();
  const selectedSpot = useSpot();

  const { categories } = useRouteLoaderData("categoryIndex") as ReturnType<
    typeof categoryLoaderIndex
  >["data"];

  const { products } = useRouteLoaderData("category") as ReturnType<
    typeof categoryLoader
  >["data"];

  const handleLoadMore = () => {
    const nextLimit = ProductsStore.items.length + ProductsStore.step;
    navigate(
      "/" +
        [lang, citySlug, spotSlug, "category", categorySlug, nextLimit].join(
          "/"
        )
    );
  };

  // if (!selectedCategory && categories.length > 0) {
  //   return <Navigate to={categories[0].slug} />;
  // }

  return (
    <>
      {false && <Banner />}
      <FlexBox flexDirection={isDesktop ? "row" : "column"}>
        <Suspense
          fallback={
            <>
              <Sidebar showSkeleton />
              <ProductsGrid showSkeleton />
            </>
          }
        >
          <Await resolve={categories}>
            {(categories) => (
              <>
                <Sidebar categories={categories} />
                <Await resolve={products}>
                  {(products) => (
                    <ProductsGrid
                      handleLoadMore={handleLoadMore}
                      title={title}
                      loadable={
                        ProductsStore.total > ProductsStore.items.length
                      }
                      loading={ProductsStore.loading}
                      items={products.filter(
                        (product) => !product.isHiddenInSpot(selectedSpot)
                      )}
                    />
                  )}
                </Await>
              </>
            )}
          </Await>
        </Suspense>
      </FlexBox>
    </>
  );
});

export const Component = Category;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const loader = ({ params, request }) => {
  const { limit = ProductsStore.step } = params;
  console.log("limit", limit);
  return defer({
    products: ProductsStore.fetchItems({
      category_slug: params.categorySlug,
      limit: +limit,
    }),
  });
};
