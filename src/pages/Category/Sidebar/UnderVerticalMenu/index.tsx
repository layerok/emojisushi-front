import * as S from "./styled";
import { Favorite } from "~components/Favorite";
import { SvgIcon } from "~components/svg/SvgIcon";
import { SvgButton } from "~components/SvgButton";
import { InstagramSvg } from "~components/svg/InstagramSvg";
import { TelegramSvg } from "~components/svg/TelegramSvg";
import { TelegramModal } from "~components/modals/TelegramModal";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLang } from "~hooks";
import { useCitySlug } from "~hooks";
import { useSpotSlug } from "~hooks";
import Skeleton from "react-loading-skeleton";

type UnderVerticalMenuProps = {
  showSkeleton?: boolean;
};

export const UnderVerticalMenu = ({
  showSkeleton = false,
}: UnderVerticalMenuProps) => {
  const navigate = useNavigate();
  let resolved = useResolvedPath("/wishlist");
  let match = useMatch({ path: resolved.pathname, end: true });
  const citySlug = useCitySlug();
  const spotSlug = useSpotSlug();
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <>
      <S.Favorite
        active={!!match}
        onClick={() => {
          navigate("/" + [lang, citySlug, spotSlug, "wishlist"].join("/"));
        }}
      >
        {showSkeleton ? (
          <Skeleton height={26} width={120} />
        ) : (
          t("common.favorite")
        )}
        {showSkeleton ? (
          <Skeleton circle width={25} height={25} />
        ) : (
          <Favorite isFavorite={true} />
        )}
      </S.Favorite>

      <S.Text>
        {showSkeleton ? <Skeleton /> : t("underVerticalMenu.in_touch")}
      </S.Text>
      <S.SvgContainer>
        <S.OneSvg
          href={"https://www.instagram.com/emoji_sushi_/"}
          target={"_blank"}
        >
          {showSkeleton ? (
            <Skeleton width={40} height={40} />
          ) : (
            <SvgButton>
              <SvgIcon color={"black"}>
                <InstagramSvg />
              </SvgIcon>
            </SvgButton>
          )}
        </S.OneSvg>
        {showSkeleton ? (
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
