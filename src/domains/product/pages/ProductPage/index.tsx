import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ProductsGrid,
  RestaurantClosed,
  Container,
  LoadMoreButton,
} from "~components";
import { Banner } from "./Banner";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Product } from "src/models";
import { cartQuery, categoriesQuery, wishlistsQuery } from "src/queries";
import { SortKey } from "src/api/types";
import { isClosed } from "src/utils/time.utils";
import { appConfig } from "src/config/app";
import { PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { MenuLayout } from "~domains/product/components/MenuLayout";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { menuApi } from "~api";
import { useInView } from "react-intersection-observer";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export const CategoryPage = observer(() => {
  const { ref, inView } = useInView();
  const closed = isClosed({
    start: appConfig.workingHours[0],
    end: appConfig.workingHours[1],
  });
  const { categorySlug } = useParams();
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit") || PRODUCTS_LIMIT_STEP;
  const q = searchParams.get("q");
  const sort = searchParams.get("sort") as SortKey;

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
  });
  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const fetchProducts = async ({ pageParam = 0 }) => {
    const res = await menuApi.getProducts({
      category_slug: q || !categorySlug ? "menu" : categorySlug,
      search: q,
      sort: sort,
      offset: pageParam * PRODUCTS_LIMIT_STEP,
      limit: PRODUCTS_LIMIT_STEP,
    });
    return res.data;
  };

  const {
    data: products,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery(
    [
      "products",
      {
        category_slug: q || !categorySlug ? "menu" : categorySlug,
        search: q,
        sort: sort,
      },
    ],
    fetchProducts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length * PRODUCTS_LIMIT_STEP > lastPage.total) {
          return undefined;
        }
        return pages.length;
      },
    }
  );

  const navigate = useNavigate();

  const handleLoadMore = () => {
    const nextLimit = +limit + PRODUCTS_LIMIT_STEP;
    navigate(
      "/" + ["category", categorySlug].join("/") + "?limit=" + nextLimit
    );
  };
  const selectedCategory = (categories?.data || []).find((category) => {
    return category.slug === categorySlug;
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const items = (products?.pages || [])
    .map((page) => page.data.map((product) => new Product(product)))
    .flat();

  return (
    <Container>
      {false && <Banner />}
      <MenuLayout categories={categories}>
        {(isWishlistLoading ||
          isCartLoading ||
          status === "loading" ||
          isCategoriesLoading) &&
        !products ? (
          <ProductsGrid loading />
        ) : (
          <div>
            <ProductsGrid
              wishlists={wishlists}
              cart={cart}
              title={selectedCategory?.name}
              loading={false}
              items={items}
            />
            {hasNextPage && (
              <S.Footer ref={ref}>
                <LoadMoreButton
                  loading={isFetchingNextPage}
                  style={{ cursor: "pointer" }}
                  text={t("common.show_more")}
                  onClick={() => {
                    if (!isFetchingNextPage) {
                      handleLoadMore();
                    }
                  }}
                />
              </S.Footer>
            )}
          </div>
        )}
      </MenuLayout>

      <RestaurantClosed open={closed} />
    </Container>
  );
});

export const Component = CategoryPage;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const ErrorBoundary = DefaultErrorBoundary;
