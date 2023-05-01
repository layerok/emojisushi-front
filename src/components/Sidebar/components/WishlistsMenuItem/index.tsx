import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import { Favorite } from "~components/Favorite";
import * as S from "./styled";
import { theme } from "~theme";

type WishlistsMenuItemProps = { loading?: boolean };

export const WishlistsMenuItem = ({
  loading = false,
}: WishlistsMenuItemProps) => {
  const { lang, spotSlug, citySlug } = useParams();
  const { t } = useTranslation();
  const to = "/" + [lang, citySlug, spotSlug, "wishlist"].join("/");

  return (
    <NavLink
      style={{
        textDecoration: "none",
      }}
      end
      to={to}
    >
      {({ isActive }) => (
        <S.Favorite
          style={{
            color: isActive ? theme.link.active : "white",
          }}
        >
          {loading ? (
            <Skeleton height={26} width={120} />
          ) : (
            t("common.favorite")
          )}
          <Favorite loading={loading} isFavorite={true} />
        </S.Favorite>
      )}
    </NavLink>
  );
};
