import * as S from "./styled";
import { observer } from "mobx-react";
import { useLang } from "~hooks";
import { useSpotSlug } from "~hooks";
import { useCitySlug } from "~hooks";
import { useCategorySlug } from "~hooks/use-category-slug";
import { ICategory } from "~api/menu.api.types";
import Skeleton from "react-loading-skeleton";

const Category = ({
  active = false,
  category,
  showSkeleton = false,
}: {
  active?: boolean;
  category?: ICategory;
  showSkeleton?: boolean;
}) => {
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();

  if (showSkeleton) {
    return (
      <Skeleton
        width={"100%"}
        height={20}
        style={{
          marginTop: 20,
        }}
      />
    );
  }
  return (
    <S.Category
      to={"/" + [lang, citySlug, spotSlug, "category", category.slug].join("/")}
      isActive={active}
      key={category.id}
    >
      {category.name}
    </S.Category>
  );
};

const VerticalMenu = observer(
  ({
    categories = [],
    showSkeleton = true,
  }: {
    categories: ICategory[];
    showSkeleton?: boolean;
  }) => {
    const categorySlug = useCategorySlug();

    if (showSkeleton) {
      return (
        <S.Categories>
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
          <Category showSkeleton />
        </S.Categories>
      );
    }

    return (
      <nav style={{ width: "255px", position: "relative" }}>
        <S.Categories>
          {categories.map((category) => {
            const active = categorySlug === category.slug;
            return <Category category={category} active={active} />;
          })}
        </S.Categories>
      </nav>
    );
  }
);

export { VerticalMenu };
