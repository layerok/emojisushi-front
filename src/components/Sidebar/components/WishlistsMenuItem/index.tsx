import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import * as S from "./styled";
import { theme } from "~theme";
import { HeartSvg } from "~components/svg";
import { SvgIcon } from "~components/SvgIcon";

type WishlistsMenuItemProps = { loading?: boolean };

export const WishlistsMenuItem = ({
  loading = false,
}: WishlistsMenuItemProps) => {
  const { t } = useTranslation();
  const to = "/wishlist";

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
          <div
            style={{
              width: 25,
            }}
          >
            <SvgIcon
              clickable={true}
              width={"100%"}
              color={"#FFE600"}
              loading={loading}
            >
              <HeartSvg />
            </SvgIcon>
          </div>
        </S.Favorite>
      )}
    </NavLink>
  );
};
