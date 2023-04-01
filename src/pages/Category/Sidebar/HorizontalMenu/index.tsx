import * as S from "./styled";
import { SvgIcon } from "~components/svg/SvgIcon";
import { HorizontalArrowsSvg } from "~components/svg/HorizontalArrowsSvg";
import { FlexBox } from "~components/FlexBox";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCitySlug, useLang, useSpotSlug } from "~hooks";
import { observer } from "mobx-react";
import { ICategory } from "~api/menu.api.types";
import Skeleton from "react-loading-skeleton";
import { clamp } from "~utils/utils";

const HorizontalMenu = observer(
  ({
    categories = [],
    showSkeleton = false,
  }: {
    categories?: ICategory[];
    showSkeleton?: boolean;
  }) => {
    const { t } = useTranslation();

    return (
      <nav>
        <S.Categories>
          <S.Hint>
            {showSkeleton ? (
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
            {showSkeleton ? (
              <>
                <Category showSkeleton />
                <Category showSkeleton />
                <Category showSkeleton />
                <Category showSkeleton />
                <Category showSkeleton />
                <Category showSkeleton />
                <Category showSkeleton />
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

const Category = ({
  showSkeleton = false,
  category,
}: {
  showSkeleton?: boolean;
  category?: ICategory;
}) => {
  const { categorySlug } = useParams();
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();
  const active = categorySlug === category?.slug;
  const nextSegments = [lang, citySlug, spotSlug, "category", category?.slug];

  if (showSkeleton) {
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
