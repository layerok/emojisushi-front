import { Await, useAsyncValue, useRouteLoaderData } from "react-router-dom";
import * as S from "./styled";

import { useSpotSlug } from "~hooks";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "~components/svg/SvgIcon";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { ToteSvg } from "~components/svg/ToteSvg";
import { categoryLoaderIndex } from "~routes";
import { Suspense } from "react";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import MenuApi from "~api/menu.api";

const Categories = () => {
  const spotSlug = useSpotSlug();
  const categoriesQuery = useAsyncValue() as Awaited<
    ReturnType<typeof MenuApi.getCategories>
  >;

  const publishedCategories = categoriesQuery.data.data
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

export const CategoryIndex = () => {
  const { t } = useTranslation();

  const { categoriesQuery } = useRouteLoaderData("categoryIndex") as ReturnType<
    typeof categoryLoaderIndex
  >["data"];

  const isMobile = useIsMobile();

  return (
    <S.Category>
      <S.Category.Container>
        <S.Category.Label>
          <Suspense fallback={<Skeleton width={220} height={20} />}>
            <Await resolve={categoriesQuery}>
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
              resolve={categoriesQuery}
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

export const Component = CategoryIndex;

Object.assign(CategoryIndex, {
  displayName: "LazyCategoryIndex",
});

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return currentParams.lang !== nextParams.lang;
};
