import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { Container, SvgIcon, ToteSvg } from "~components";
import { Category } from "./components/Category";
import Skeleton from "react-loading-skeleton";
import { categoriesQuery } from "~queries";
import { useQuery } from "@tanstack/react-query";
import { accessApi } from "~api";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";

export const SelectCategoryPage = observer(() => {
  const { t } = useTranslation();
  const appStore = useAppStore();

  const { data: spot } = useQuery({
    queryFn: async () =>
      accessApi
        .getSpot({
          slug_or_id: appStore.spot.slug,
        })
        .then((res) => res.data),

    queryKey: ["spot", appStore.spot.slug],
  });

  const { data: categories, isLoading } = useQuery({
    ...categoriesQuery({
      spot_slug_or_id: spot?.slug,
    }),
    enabled: !!spot?.slug,
  });

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
            ) : (
              <S.Category.List>
                {categories.data.map((category) => (
                  <Category key={category.id} category={category} />
                ))}
              </S.Category.List>
            )}
          </S.Category.Items>
        </S.Category.Container>
      </S.Category>
    </Container>
  );
});

export const Component = SelectCategoryPage;

Object.assign(SelectCategoryPage, {
  displayName: "LazySelectCategoryPage",
});
