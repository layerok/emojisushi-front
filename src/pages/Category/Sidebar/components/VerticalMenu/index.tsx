import * as S from "./styled";
import { observer } from "mobx-react";
import { useCategorySlug } from "~hooks/use-category-slug";
import { ICategory } from "~api/menu.api.types";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

type TCategoryProps = {
  active?: boolean;
  category?: ICategory;
  loading?: boolean;
};

const Category = ({
  active = false,
  category,
  loading = false,
}: TCategoryProps) => {
  const { lang, spotSlug, citySlug } = useParams();

  if (loading) {
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

type TVerticalMenuProps = {
  categories: ICategory[];
  loading?: boolean;
};

const VerticalMenu = observer(
  ({ categories = [], loading = true }: TVerticalMenuProps) => {
    const categorySlug = useCategorySlug();

    if (loading) {
      return (
        <S.Categories>
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
          <Category loading />
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
