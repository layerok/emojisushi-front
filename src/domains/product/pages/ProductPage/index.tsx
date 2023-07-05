import {
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { ProductsGrid, RestaurantClosed, Container } from "~components";
import { Banner } from "./Banner";
import { useQuery } from "@tanstack/react-query";
import { Product } from "src/models";
import { cartQuery, categoriesQuery, wishlistsQuery } from "src/queries";
import { productsQuery } from "src/queries";
import {
  ICategory,
  IGetCartRes,
  IGetProductsRes,
  IGetWishlistRes,
  SortKey,
} from "src/api/types";
import { isClosed } from "src/utils/time.utils";
import { appConfig } from "src/config/app";
import { PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { MenuLayout } from "~domains/product/components/MenuLayout";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import { citiesQuery } from "~queries/cities.query";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

export const CategoryPage = () => {
  const closed = isClosed({
    start: appConfig.workingHours[0],
    end: appConfig.workingHours[1],
  });
  const { categorySlug } = useParams();

  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") as SortKey;

  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    categoriesQuery()
  );
  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const { data: products, isLoading: isProductsLoading } = useQuery({
    ...productsQuery({
      category_slug: q || !categorySlug ? "menu" : categorySlug,
      search: q,
      sort: sort,
      offset: 0,
      limit: +limit,
    }),
    onError: () => {},
  });

  return (
    <Container>
      {false && <Banner />}
      <MenuLayout categories={categories}>
        {isWishlistLoading ||
        isCartLoading ||
        isProductsLoading ||
        isCategoriesLoading ||
        isCitiesLoading ? (
          <ProductsGrid loading />
        ) : (
          <PublishedCategories categories={categories.data}>
            {({ categories }) => (
              <AwaitedProducts
                wishlists={wishlists}
                products={products}
                cart={cart}
                categories={categories}
              />
            )}
          </PublishedCategories>
        )}
      </MenuLayout>

      <RestaurantClosed open={closed} />
    </Container>
  );
};

export const AwaitedProducts = ({
  categories,
  cart,
  products,
  wishlists,
}: {
  categories: ICategory[];
  cart?: IGetCartRes;
  products?: IGetProductsRes;
  wishlists?: IGetWishlistRes;
}) => {
  const { categorySlug, spotSlug, citySlug } = useParams();

  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
  const navigation = useNavigation();
  const { lang } = useParams();
  const navigate = useNavigate();

  const selectedCategory = categories.find((category) => {
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
  // subtracting hidden products from total
  const total = products.total - (products.data.length - items.length);

  // todo: show skeleton while searching products
  return (
    <ProductsGrid
      wishlists={wishlists}
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

export const ErrorBoundary = DefaultErrorBoundary;
