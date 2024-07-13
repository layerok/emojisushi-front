import * as S from "./styled";
import { ICategory } from "@layerok/emojisushi-js-sdk";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import { ROUTES } from "~routes";

type CategoryProps = {
  active?: boolean;
  category?: ICategory;
  loading?: boolean;
  onNavigate?: () => void;
};

const Category = ({ category, loading = false, onNavigate }: CategoryProps) => {
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
      onClick={(e) => {
        onNavigate?.();
      }}
    >
      {({ isActive }) => (
        <S.Category isActive={isActive}>{category.name}</S.Category>
      )}
    </NavLink>
  );
};

type SidebarMenuProps = {
  categories: ICategory[];
  loading?: boolean;
  onNavigate?: () => void;
};

const SidebarMenu = ({
  categories = [],
  onNavigate,
  loading = true,
}: SidebarMenuProps) => {
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
    <div style={{ position: "relative" }}>
      <S.Categories>
        {categories.map((category) => {
          return (
            <Category
              onNavigate={onNavigate}
              key={category.id}
              category={category}
            />
          );
        })}
      </S.Categories>
    </div>
  );
};
export { SidebarMenu };
