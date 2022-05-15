import {SvgIcon} from "../svg/SvgIcon";
import {HeartSvg} from "../svg/HeartSvg";
import * as S from "./styled";

export const Favorite = (
    {
        isFavorite
    }
) => {
    return <S.Wrapper>
        <SvgIcon width={"25px"} color={isFavorite ? "#FFE600": "white"}>
            <HeartSvg/>
        </SvgIcon>
    </S.Wrapper>
}