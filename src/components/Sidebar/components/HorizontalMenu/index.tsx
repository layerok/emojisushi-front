import * as S from "./styled";
import { HorizontalArrowsSvg } from "src/components/svg";
import { FlexBox, SvgIcon } from "src/components";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { ICategory } from "src/api/types";
import Skeleton from "react-loading-skeleton";
import { clamp } from "src/utils/utils";

type THorizontalMenuProps = {
  categories?: ICategory[];
  loading?: boolean;
};

const HorizontalMenu = observer(
  ({ categories = [], loading = false }: THorizontalMenuProps) => {
    const { t } = useTranslation();

    return (
      <nav>
        <S.Categories>
          <S.Hint>
            {loading ? (
              <Skeleton width={87} height={25} />
            ) : (
              <FlexBox alignItems={"center"}>
                <SvgIcon width={"25px"}>
                  <HorizontalArrowsSvg />
                </SvgIcon>
                <div style={{ marginLeft: "10px" }}>{t("common.swipe")}</div>
              </FlexBox>
            )}
          </S.Hint>

          <S.HorizontalContainer>
            {loading ? (
              <>
                <Category loading />
                <Category loading />
                <Category loading />
                <Category loading />
                <Category loading />
                <Category loading />
                <Category loading />
              </>
            ) : (
              categories.map((category) => {
                return <Category category={category} />;
              })
            )}
          </S.HorizontalContainer>
        </S.Categories>
      </nav>
    );
  }
);

type TCategoryProps = {
  loading?: boolean;
  category?: ICategory;
};

const Category = ({ loading = false, category }: TCategoryProps) => {
  const { categorySlug } = useParams();
  const { lang, spotSlug, citySlug } = useParams();
  const active = categorySlug === category?.slug;
  const nextSegments = [lang, citySlug, spotSlug, "category", category?.slug];

  if (loading) {
    const randomWidth = Math.floor(Math.random() * 250);
    return (
      <S.Category>
        <Skeleton
          borderRadius={5}
          height={40}
          width={clamp(randomWidth, 80, 250)}
        />
      </S.Category>
    );
  }

  return (
    <S.Category>
      <S.CategoryLink
        to={"/" + nextSegments.join("/")}
        isActive={active}
        key={category.id}
      >
        {category.name}
      </S.CategoryLink>
    </S.Category>
  );
};

export { HorizontalMenu };
