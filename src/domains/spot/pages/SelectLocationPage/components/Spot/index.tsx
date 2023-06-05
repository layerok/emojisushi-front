import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { SvgIcon, MapPinSvg } from "~components";
import * as S from "./styled";
import { useParams } from "react-router-dom";
import { ISpot } from "~api/types";

export const Spot = ({ spot }: { spot?: ISpot }) => {
  const { lang } = useParams();
  const { t } = useTranslation();
  return (
    <S.Link
      to={
        spot
          ? "/" + [lang, spot.city.slug, spot.slug, "category"].join("/")
          : undefined
      }
    >
      <S.Inner>
        <S.Content>
          <S.Head>
            {spot ? t("common.address") : <Skeleton width={50} />}
            <SvgIcon width={"15px"} color={"#FFE600"}>
              <MapPinSvg />
            </SvgIcon>
          </S.Head>
          {spot?.address ?? <Skeleton />}
        </S.Content>
      </S.Inner>
    </S.Link>
  );
};
