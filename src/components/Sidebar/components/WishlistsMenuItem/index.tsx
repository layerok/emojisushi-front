import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import * as S from "./styled";
import { HeartSvg } from "~components/svg";
import { SvgIcon } from "~components/SvgIcon";
import { SkeletonWrap } from "~components";
import { useTheme } from "styled-components";
import { ROUTES } from "~routes";

export const WishlistsMenuItem = ({
  loading = false,
  onNavigate,
}: {
  loading?: boolean;
  onNavigate?: () => void;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <NavLink
      style={{
        textDecoration: "none",
      }}
      onClick={() => {
        onNavigate?.();
      }}
      end
      to={ROUTES.CATEGORY.WISHLIST.path}
    >
      {({ isActive }) => (
        <S.Favorite
          style={{
            color: isActive ? theme.colors.brand : "white",
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
            <SkeletonWrap loading={loading}>
              <SvgIcon
                clickable={true}
                width={"100%"}
                color={theme.colors.brand}
              >
                <HeartSvg />
              </SvgIcon>
            </SkeletonWrap>
          </div>
        </S.Favorite>
      )}
    </NavLink>
  );
};
