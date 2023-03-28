import { Await, useRouteLoaderData } from "react-router-dom";
import * as S from "./styled";

import { useCategoriesStore, useSpot } from "~hooks";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "~components/svg/SvgIcon";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import { ToteSvg } from "~components/svg/ToteSvg";
import { categoryLoader } from "~routes";
import { Suspense } from "react";
import { Category } from "./components/Category";

const Categories = () => {
  const selectedSpot = useSpot();
  const categoriesStore = useCategoriesStore();
  return (
    <ul>
      {categoriesStore.publishedCategories
        .filter((category) => {
          const hidden = category.hide_categories_in_spot.find(
            (spot) => spot.id === selectedSpot.id
          );
          return !hidden;
        })
        .map((category) => (
          <Category key={category.id} category={category} />
        ))}
    </ul>
  );
};

const CategoriesSkeleton = () => {
  return (
    <ul>
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
    </ul>
  );
};

export const CategoryIndex = () => {
  const { t } = useTranslation();

  const { categories } = useRouteLoaderData("category") as ReturnType<
    typeof categoryLoader
  >["data"];

  const isMobile = useIsMobile();

  return (
    <S.Category>
      <S.Category.Container>
        <S.Category.Label>
          {t("categoryIndex.title")}
          <SvgIcon width={isMobile ? "20px" : "25px"} color={"white"}>
            <ToteSvg />
          </SvgIcon>
        </S.Category.Label>
        <S.Category.Items>
          <Suspense fallback={<CategoriesSkeleton />}>
            <Await
              resolve={categories}
              errorElement={<p>Error downloading categories!</p>}
            >
              {(categories) => <Categories />}
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
