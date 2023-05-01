import { Await, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { SvgIcon, ToteSvg } from "~components";
import { useBreakpoint2 } from "~common/hooks";
import { Suspense } from "react";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import { IGetCategoriesRes } from "~api/types";
import { categoriesQuery } from "~queries";
import { queryClient } from "~query-client";
import { SelectCategoryPageLoaderData } from "~domains/category/types";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";

const CategoriesList = () => {
  const categories = useAsyncValue() as IGetCategoriesRes;

  return (
    <S.Category.List>
      <PublishedCategories categories={categories.data}>
        {({ categories }) =>
          categories.map((category) => (
            <Category key={category.id} category={category} />
          ))
        }
      </PublishedCategories>
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

export const SelectCategoryPage = () => {
  const { t } = useTranslation();

  const { categories } = useLoaderData() as SelectCategoryPageLoaderData;
  const { isMobile } = useBreakpoint2();

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
              <CategoriesList />
            </Await>
          </Suspense>
        </S.Category.Items>
      </S.Category.Container>
    </S.Category>
  );
};

export const Component = SelectCategoryPage;

Object.assign(SelectCategoryPage, {
  displayName: "LazySelectCategoryPage",
});

export const loader = ({ params }) => {
  const query = categoriesQuery();
  return defer({
    categories:
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
  });
};

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return currentParams.lang !== nextParams.lang;
};
