import BannerSrc from "../../assets/img/banner.png";
import * as S from "./styled";

export const Banner = () => {
    return (
        <S.Banner>
            <img src={BannerSrc} alt=""/>
        </S.Banner>
    );
}