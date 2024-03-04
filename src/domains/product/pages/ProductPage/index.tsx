import { useNavigate } from "react-router-dom";
import { ProductsGrid, Container, LoadMoreButton } from "~components";
import { Banner } from "./Banner";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Product } from "src/models";
import {
  cartQuery,
  categoriesQuery,
  productsQuery,
  wishlistsQuery,
} from "src/queries";
import { SortKey } from "src/api/types";
import { CategorySlug, PRODUCTS_LIMIT_STEP } from "~domains/category/constants";
import { MenuLayout } from "~domains/product/components/MenuLayout";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { menuApi } from "~api";
import { useInView } from "react-intersection-observer";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ROUTES } from "~routes";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes/dom";
import { Page } from "~components/Page";

export const ProductPage = observer(() => {
  const { ref, inView } = useInView();

  const { categorySlug } = useTypedParams(ROUTES.CATEGORY.SHOW);
  const { t } = useTranslation();

  const [searchParams] = useTypedSearchParams(ROUTES.CATEGORY.SHOW);
  const { limit = PRODUCTS_LIMIT_STEP, q } = searchParams;

  const sort = searchParams.sort as SortKey;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const filters = {
    category_slug: q || !categorySlug ? CategorySlug.Menu : categorySlug,
    search: q,
    sort: sort,
  };

  const productQueryKey = productsQuery(filters);

  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    ...categoriesQuery(),
    onSuccess: (data) => {
      const category = data.data.find(
        (category) => category.slug === categorySlug
      );

      if (!category) {
        // if a user requested a category that doesn't exist,
        // then redirect him to first existing category
        queryClient.cancelQueries({
          queryKey: productQueryKey.queryKey,
        });
        navigate(
          ROUTES.CATEGORY.SHOW.buildPath({
            categorySlug: data.data[0].slug,
          })
        );
      }
    },
  });

  const { data: wishlists, isLoading: isWishlistLoading } =
    useQuery(wishlistsQuery);

  const fetchProducts = async ({
    pageParam = 0,
    signal,
  }: {
    pageParam: number;
    signal: AbortSignal;
  }) => {
    const res = await menuApi.getProducts(
      {
        category_slug: q || !categorySlug ? CategorySlug.Menu : categorySlug,
        search: q,
        sort: sort,
        offset: pageParam * PRODUCTS_LIMIT_STEP,
        limit: PRODUCTS_LIMIT_STEP,
      },
      signal
    );
    return res.data;
  };

  const {
    data: products,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    status,
  } = useInfiniteQuery(
    productQueryKey.queryKey,
    ({ pageParam, signal }) => fetchProducts({ pageParam, signal }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length * PRODUCTS_LIMIT_STEP >= lastPage.total) {
          return undefined;
        }
        return pages.length;
      },
      // todo: dependent queries lead to request waterfall
      // todo: load products in parallel if requested category is not found, redirect to a categories page
      enabled: !!categories,
    }
  );

  const handleLoadMore = () => {
    navigate(
      ROUTES.CATEGORY.SHOW.buildPath(
        {
          categorySlug: categorySlug,
        },
        {
          limit: +limit + PRODUCTS_LIMIT_STEP,
        }
      )
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
    .reduce((acc, pageProducts) => [...acc, ...pageProducts], []); // flattening

  return (
    <>
      <Container>
        <S.BannerContainer>
          <Banner />
        </S.BannerContainer>
      </Container>

      <Page>
        <Container>
          <MenuLayout categories={categories}>
            {(isWishlistLoading ||
              isCartLoading ||
              status === "loading" ||
              isCategoriesLoading) &&
            !products ? (
              <ProductsGrid loading />
            ) : (
              <div style={{ flexGrow: 1 }}>
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
        </Container>
      </Page>
    </>
  );
});

export const Component = ProductPage;

Object.assign(Component, {
  displayName: "LazyCategoryPage",
});

export const ErrorBoundary = DefaultErrorBoundary;
