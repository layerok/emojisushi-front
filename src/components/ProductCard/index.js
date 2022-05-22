import * as S from "./styled";
import {AddToCartButton} from "../buttons/AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {IngredientsTooltip} from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from 'react-equal-height';

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
            image,
            ingredients
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
        <EqualHeightElement name={"product-name"}>
            <S.Name>{name}</S.Name>
        </EqualHeightElement>
        <S.Description>
            <S.Weight>{weight}</S.Weight>
            <IngredientsTooltip items={ingredients} iconSize={iconSize}/>
        </S.Description>
        <S.Footer>
            <Price oldPrice={old_price} newPrice={new_price}/>
            <AddToCartButton width={isMobile ? '177px': '130px'} count={count} pending={pending}/>
        </S.Footer>
    </S.Wrapper>;
}