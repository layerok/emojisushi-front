import * as S from "./styled";
import {AddToCartButton} from "../buttons/AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {useBreakpoint} from "../../common/hooks/useBreakpoint";
import {IngredientsTooltip} from "../tooltips/IngredientsTooltip";
import { EqualHeightElement } from 'react-equal-height';
import {inject, observer} from "mobx-react";
import {
    getProductIngredients,
    getProductMainImage,
    getProductNewPrice,
    getProductOldPrice
} from "../../utils/utils";
import {Loader} from "../Loader";

const ProductCardRaw = (
    {
        product: {
            id,
            name,
            weight,
            prices,
            additional_prices,
            is_favorite_,
            image_sets,
            description
        },
        CartStore,
        ProductsStore,
        WishlistStore,
    }
) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const iconSize = isMobile ? '33px': '25px';
    const ingredients = getProductIngredients({description});
    const oldPrice = getProductOldPrice({additional_prices});
    const newPrice = getProductNewPrice({prices});
    const img = getProductMainImage({image_sets});
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
        <Loader loading={WishlistStore.pending.includes(id)}/>
        <S.Favorite onClick={() => {
            WishlistStore.addItem({
                product_id: id,
                quantity: count
            }).then((res) => {
                const items = ProductsStore.items.map((item) => {
                    if(item.id === id) {
                        item.is_favorite_ = res.data.added;
                    }
                    return item;
                });

                ProductsStore.setItems(items)
            })
        }}>
            <Favorite width={iconSize} isFavorite={is_favorite_}/>
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

export const ProductCard = inject('CartStore', 'ProductsStore', 'WishlistStore')(observer(ProductCardRaw))