import { SvgIcon } from "../SvgIcon";
import { HeartSvg } from "../svg/HeartSvg";
import * as S from "./styled";

export const Favorite = ({
  isFavorite = false,
  width = "25px",
  loading = false,
}) => {
  const color = isFavorite ? "#FFE600" : "white";
  return (
    <S.Wrapper>
      <SvgIcon
        clickable={true}
        width={width}
        color={color}
        hoverColor={"#FFE600"}
        loading={loading}
      >
        <HeartSvg />
      </SvgIcon>
    </S.Wrapper>
  );
};
