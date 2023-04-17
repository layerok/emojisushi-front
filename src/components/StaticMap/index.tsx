import * as S from "./styled";
import { SvgIcon, MapPinSvg, SvgButton } from "~components";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

export const StaticMap = ({
  width,
  height,
  topLeft,
  topRight,
  bottomRight,
  bottomLeft,
  mobileFirst,
  style,
}: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { spotSlug, citySlug, lang } = useParams();

  return (
    // refactor this apropcaplypsis
    <S.Background
      style={style}
      width={width}
      height={height}
      topRight={topRight}
      topLeft={topLeft}
      bottomLeft={bottomLeft}
      bottomRight={bottomRight}
      mobileFirst={mobileFirst}
      onClick={() => {
        navigate(
          "/" + [lang, citySlug, spotSlug, "dostavka-i-oplata"].join("/")
        );
      }}
    >
      <SvgButton>
        <SvgIcon color={"black"}>
          <MapPinSvg />
        </SvgIcon>
      </SvgButton>
      <S.MapText
        dangerouslySetInnerHTML={{
          __html: t("map.on_map", { interpolation: { escapeValue: false } }),
        }}
      ></S.MapText>
    </S.Background>
  );
};

StaticMap.defaultProps = {
  topLeft: "15px",
  topRight: "15px",
  bottomRight: "15px",
  bottomLeft: "15px",
};
