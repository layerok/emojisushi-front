import * as S from "./styled";
import { ICategory } from "src/api/types";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { ROUTES } from "~routes";

type TCategoryProps = {
  active?: boolean;
  category?: ICategory;
  loading?: boolean;
};

const Category = ({ category, loading = false }: TCategoryProps) => {
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
    <NavLink
      style={{ textDecoration: "none", display: "inline-block", marginTop: 20 }}
      key={category.id}
      to={ROUTES.CATEGORY.SHOW.buildPath({
        categorySlug: category.slug,
      })}
    >
      {({ isActive }) => (
        <S.Category isActive={isActive}>{category.name}</S.Category>
      )}
    </NavLink>
  );
};

type TVerticalMenuProps = {
  categories: ICategory[];
  loading?: boolean;
};

const SidebarMenu = ({
  categories = [],
  loading = true,
}: TVerticalMenuProps) => {
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
          return <Category key={category.id} category={category} />;
        })}
      </S.Categories>
    </nav>
  );
};
export { SidebarMenu };
