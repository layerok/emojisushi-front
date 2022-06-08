import * as S from "./styled";
import {AddToCartButton} from "../buttons/AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {IngredientsTooltip} from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from 'react-equal-height';
import {inject, observer} from "mobx-react";

const ProductCardRaw = (
    {
        product: {
            id,
            name,
            weight,
            prices,
            additional_prices,
            is_favorite,
            image_sets,
            description
        },
        CartStore
    }
) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const iconSize = isMobile ? '33px': '25px';
    const ingredients = (description && description.split(',')) || [];
    const oldPrice = additional_prices.length > 0 ? additional_prices[0].price_formatted: undefined;
    const newPrice = prices.length > 0 ? prices[0].price_formatted: undefined;
    const img = (image_sets.length > 0 && image_sets[0] && image_sets[0].images.length > 0) ? image_sets[0].images[0].path : "default_image";
    const cartProduct = CartStore.items.find((cartProduct) => cartProduct.product_id === id);
    const count = cartProduct?.quantity || 0;


    const handleAdd = (product_id) => {
        return (quantity) => {
            CartStore.addProduct({
                product_id,
                quantity
            })
        }
    }

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
            <AddToCartButton
                width={isMobile ? '177px': '130px'}
                count={count}
                pending={CartStore.pending.includes(id)}
                handleAdd={handleAdd(id)}
            />
        </S.Footer>
    </S.Wrapper>;
}

export const ProductCard = inject('CartStore')(observer(ProductCardRaw))