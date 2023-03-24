import { SvgIcon } from "../svg/SvgIcon";
import { HeartSvg } from "../svg/HeartSvg";
import * as S from "./styled";

export const Favorite = ({ isFavorite = false, width = "25px" }) => {
  const color = isFavorite ? "#FFE600" : "white";
  return (
    <S.Wrapper>
      <SvgIcon width={width} color={color} hoverColor={"#FFE600"}>
        <HeartSvg />
      </SvgIcon>
    </S.Wrapper>
  );
};
