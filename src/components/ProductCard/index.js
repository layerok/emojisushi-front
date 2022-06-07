import * as S from "./styled";
import {AddToCartButton} from "../buttons/AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {IngredientsTooltip} from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from 'react-equal-height';
import {useWindowSize} from "react-use";

export const ProductCard = (
    {
        product: {
            name,
            weight,
            prices,
            additional_prices,
            count,
            is_favorite,
            pending,
            image_sets,
            description
        }
    }
) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const iconSize = isMobile ? '33px': '25px';
    const ingredients = (description && description.split(',')) || [];
    const oldPrice = additional_prices.length > 0 ? additional_prices[0].price_formatted: undefined;
    const newPrice = prices.length > 0 ? prices[0].price_formatted: undefined;
    const img = (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : "default_image";

    return <S.Wrapper>
        <S.Favorite>
            <Favorite width={iconSize} isFavorite={is_favorite}/>
        </S.Favorite>
        <S.Image src={img}/>
        <EqualHeightElement name={"product-name"}>
            <S.Name>{name}</S.Name>
        </EqualHeightElement>
        <S.Description>
            <S.Weight>{weight} г</S.Weight>
            {ingredients.length !== 0 && (<IngredientsTooltip items={ingredients} iconSize={iconSize}/>)}
        </S.Description>
        <S.Footer>
            <Price oldPrice={oldPrice} newPrice={newPrice}/>
            <AddToCartButton width={isMobile ? '177px': '130px'} count={count} pending={pending}/>
        </S.Footer>
    </S.Wrapper>;
}