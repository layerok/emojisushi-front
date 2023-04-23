import * as S from "./styled";
import { SvgIcon, SvgButton, Favorite, TelegramModal } from "~components";
import { TelegramSvg, InstagramSvg } from "~components/svg";
import {
  useMatch,
  useNavigate,
  useParams,
  useResolvedPath,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

type UnderVerticalMenuProps = {
  loading?: boolean;
};

export const UnderVerticalMenu = ({
  loading = false,
}: UnderVerticalMenuProps) => {
  const navigate = useNavigate();
  let resolved = useResolvedPath("/wishlist");
  let match = useMatch({ path: resolved.pathname, end: true });
  const { lang, spotSlug, citySlug } = useParams();
  const { t } = useTranslation();
  return (
    <>
      <S.Favorite
        active={!!match}
        onClick={() => {
          navigate("/" + [lang, citySlug, spotSlug, "wishlist"].join("/"));
        }}
      >
        {loading ? <Skeleton height={26} width={120} /> : t("common.favorite")}
        {loading ? (
          <Skeleton circle width={25} height={25} />
        ) : (
          <Favorite isFavorite={true} />
        )}
      </S.Favorite>

      <S.Text>
        {loading ? <Skeleton /> : t("underVerticalMenu.in_touch")}
      </S.Text>
      <S.SvgContainer>
        <S.OneSvg
          href={"https://www.instagram.com/emoji_sushi_/"}
          target={"_blank"}
        >
          {loading ? (
            <Skeleton width={40} height={40} />
          ) : (
            <SvgButton>
              <SvgIcon color={"black"}>
                <InstagramSvg />
              </SvgIcon>
            </SvgButton>
          )}
        </S.OneSvg>
        {loading ? (
          <Skeleton width={40} height={40} />
        ) : (
          <TelegramModal>
            <SvgButton>
              <SvgIcon color={"black"}>
                <TelegramSvg />
              </SvgIcon>
            </SvgButton>
          </TelegramModal>
        )}
      </S.SvgContainer>
    </>
  );
};
