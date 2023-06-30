import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { Container, SvgIcon, ToteSvg } from "~components";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import { IGetCategoriesRes } from "~api/types";
import { categoriesQuery } from "~queries";
import { PublishedCategories } from "~domains/category/components/PublishedCategories";
import { useQuery } from "react-query";

const CategoriesList = ({ categories }: { categories: IGetCategoriesRes }) => {
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

  const { data: categories, isLoading } = useQuery(categoriesQuery());

  return (
    <Container>
      <S.Category>
        <S.Category.Container>
          <S.Category.Label>
            {isLoading ? (
              <Skeleton width={220} height={20} />
            ) : (
              <>
                {t("categoryIndex.title")}
                <S.IconWrapper>
                  <SvgIcon width={"auto"} color={"white"}>
                    <ToteSvg />
                  </SvgIcon>
                </S.IconWrapper>
              </>
            )}
          </S.Category.Label>
          <S.Category.Items>
            {isLoading ? (
              <CategoriesSkeleton />
            ) : (
              <CategoriesList categories={categories} />
            )}
          </S.Category.Items>
        </S.Category.Container>
      </S.Category>
    </Container>
  );
};

export const Component = SelectCategoryPage;

Object.assign(SelectCategoryPage, {
  displayName: "LazySelectCategoryPage",
});
