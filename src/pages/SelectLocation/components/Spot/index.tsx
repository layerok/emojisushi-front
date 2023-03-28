import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import { MapPinSvg } from "~components/svg/MapPinSvg";
import { SvgIcon } from "~components/svg/SvgIcon";
import { useLang } from "~hooks";
import { Spot as SpotInstance } from "~stores/cities.store";
import * as S from "./styled";

export const Spot = ({ spot }: { spot?: SpotInstance }) => {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <S.Link
      to={"/" + lang + "/" + spot?.city.slug + "/" + spot?.slug + "/category"}
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
