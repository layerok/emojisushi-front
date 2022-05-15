import {SvgIcon} from "../svg/SvgIcon";
import {HeartSvg} from "../svg/HeartSvg";
import * as S from "./styled";

export const Favorite = (
    {
        isFavorite,
        width = "25px"
    }
) => {
    return <S.Wrapper>
        <SvgIcon width={width} color={isFavorite ? "#FFE600": "white"}>
            <HeartSvg/>
        </SvgIcon>
    </S.Wrapper>
}