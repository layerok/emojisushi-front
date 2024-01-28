import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { Container, SvgIcon, ToteSvg } from "~components";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import { categoriesQuery } from "~queries";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react";

export const SelectCategoryPage = observer(() => {
  const { t } = useTranslation();

  const { data: categories, isLoading } = useQuery({
    ...categoriesQuery(),
  });

  return (
    <Container>
      <S.Category>
        <S.CategoryContainer>
          <S.CategoryLabel>
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
          </S.CategoryLabel>
          <S.CategoryItems>
            {isLoading ? (
              <S.CategoryList>
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
              </S.CategoryList>
            ) : (
              <S.CategoryList>
                {categories.data.map((category) => (
                  <Category key={category.id} category={category} />
                ))}
              </S.CategoryList>
            )}
          </S.CategoryItems>
        </S.CategoryContainer>
      </S.Category>
    </Container>
  );
});

export const Component = SelectCategoryPage;

Object.assign(SelectCategoryPage, {
  displayName: "LazySelectCategoryPage",
});
