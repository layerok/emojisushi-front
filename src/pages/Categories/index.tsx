import {
  Await,
  defer,
  useAsyncValue,
  useRouteLoaderData,
} from "react-router-dom";
import * as S from "./styled";
import { useSpotSlug } from "~hooks";
import { useTranslation } from "react-i18next";
import { SvgIcon, ToteSvg } from "~components";
import { useIsMobile } from "~common/hooks";
import { Suspense } from "react";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import { IGetCategoriesResponse } from "~api/types";
import { categoriesQuery } from "~queries";
import { queryClient } from "~query-client";

const Categories = () => {
  const spotSlug = useSpotSlug();
  const categories = useAsyncValue() as IGetCategoriesResponse;

  const publishedCategories = categories.data
    .filter((category) => category.published)
    .filter((category) => {
      return !category.hide_categories_in_spot
        .map((spot) => spot.slug)
        .includes(spotSlug);
    });

  return (
    <S.Category.List>
      {publishedCategories
        .filter((category) => {
          const hidden = category.hide_categories_in_spot.find(
            (spot) => spot.slug === spotSlug
          );
          return !hidden;
        })
        .map((category) => (
          <Category key={category.id} category={category} />
        ))}
    </S.Category.List>
  );
};

const CategoriesSkeleton = () => {
  return (
    <S.Category.List>
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
      <Category />
    </S.Category.List>
  );
};

export const CategoriesPage = () => {
  const { t } = useTranslation();

  const { categories }: CategoriesLoaderResolvedData = useRouteLoaderData(
    "categories"
  ) as any;

  const isMobile = useIsMobile();

  return (
    <S.Category>
      <S.Category.Container>
        <S.Category.Label>
          <Suspense fallback={<Skeleton width={220} height={20} />}>
            <Await resolve={categories}>
              <>
                {t("categoryIndex.title")}
                <SvgIcon width={isMobile ? "20px" : "25px"} color={"white"}>
                  <ToteSvg />
                </SvgIcon>
              </>
            </Await>
          </Suspense>
        </S.Category.Label>
        <S.Category.Items>
          <Suspense fallback={<CategoriesSkeleton />}>
            <Await
              resolve={categories}
              errorElement={<p>Error fetching categories!</p>}
            >
              <Categories />
            </Await>
          </Suspense>
        </S.Category.Items>
      </S.Category.Container>
    </S.Category>
  );
};

export const Component = CategoriesPage;

Object.assign(CategoriesPage, {
  displayName: "LazyCategoriesPage",
});

export type CategoriesLoaderResolvedData = {
  categories: IGetCategoriesResponse;
};

export const categoriesLoader = ({ params }) => {
  const query = categoriesQuery();
  return defer({
    categories:
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
  } as CategoriesLoaderResolvedData);
};

export const loader = categoriesLoader;

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return currentParams.lang !== nextParams.lang;
};
