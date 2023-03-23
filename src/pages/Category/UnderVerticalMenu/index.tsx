import * as S from "./styled";
import { Favorite } from "~components/Favorite";
import { SvgIcon } from "~components/svg/SvgIcon";
import { SvgButton } from "~components/SvgButton";
import { InstagramSvg } from "~components/svg/InstagramSvg";
import { TelegramSvg } from "~components/svg/TelegramSvg";
import { TelegramModal } from "~components/modals/TelegramModal";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCity, useSpot } from "~hooks";

export const UnderVerticalMenu = () => {
  const navigate = useNavigate();
  let resolved = useResolvedPath("/wishlist");
  let match = useMatch({ path: resolved.pathname, end: true });
  const city = useCity();
  const spot = useSpot();
  const { t } = useTranslation();
  return (
    <>
      <S.Favorite
        active={!!match}
        onClick={() => {
          navigate("/" + city.slug + "/" + spot.slug + "/wishlist");
        }}
      >
        {t("common.favorite")}
        <Favorite isFavorite={true} />
      </S.Favorite>
      <S.Text>{t("underVerticalMenu.in_touch")}</S.Text>
      <S.SvgContainer>
        <S.OneSvg
          href={"https://www.instagram.com/emoji_sushi_/"}
          target={"_blank"}
        >
          <SvgButton>
            <SvgIcon color={"black"}>
              <InstagramSvg />
            </SvgIcon>
          </SvgButton>
        </S.OneSvg>
        <TelegramModal>
          <SvgButton>
            <SvgIcon color={"black"}>
              <TelegramSvg />
            </SvgIcon>
          </SvgButton>
        </TelegramModal>
      </S.SvgContainer>
    </>
  );
};
