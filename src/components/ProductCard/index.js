import * as S from "./styled";
import {AddToCartButton} from "../AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {SvgIcon} from "../svg/SvgIcon";
import {InfoSvg} from "../svg/InfoSvg";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";

export const ProductCard = (
    {
        product: {
            name,
            weight,
            old_price,
            new_price,
            count,
            is_favorite,
            pending,
            image
        }
    }
) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const iconSize = isMobile ? '33px': '25px';

    return <S.Wrapper>
        <S.Favorite>
            <Favorite width={iconSize} isFavorite={is_favorite}/>
        </S.Favorite>
        <S.Image src={image}/>
        <S.Name>{name}</S.Name>
        <S.Description>
            <S.Weight>{weight}</S.Weight>
            <SvgIcon width={iconSize} color={"#999"}>
                <InfoSvg/>
            </SvgIcon>
        </S.Description>
        <S.Footer>
            <Price oldPrice={old_price} newPrice={new_price}/>
            <AddToCartButton width={isMobile ? '177px': '130px'} count={count} pending={pending}/>
        </S.Footer>
    </S.Wrapper>;
}