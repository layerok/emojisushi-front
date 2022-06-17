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
import {SvgIcon} from "../svg/SvgIcon";
import {LogoSvg} from "../svg/LogoSvg";
import {Switcher} from "../Switcher";
import {useState} from "react";

const ProductCardRaw = (
    {
        product,
        CartStore,
        ProductsStore,
        WishlistStore,
    }
) => {
    const {
        id,
        name,
        weight,
        is_favorite_,
    } = product;
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === 'mobile';
    const iconSize = isMobile ? '33px': '25px';
    const ingredients = getProductIngredients(product);
    const oldPrice = getProductOldPrice(product);
    const newPrice = getProductNewPrice(product);
    const img = getProductMainImage(product);
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

    const mod_groups = product.property_values.filter((value) => {
       return value.property?.options?.length > 0
    }).reduce((acc, property) => {
        if(acc.includes(property.property_id)) {
            return acc;
        }
        return [...acc, property.property_id]
    }, []).map((id) => {
        return product.property_values.find((property) => property.property_id === id)
    });

    const initialModificatorsState = mod_groups.reduce((acc, group) => {
        return {
            ...acc,
            [group.property.id]: group.property.options[0].poster_id
        }
    }, {})

    const [modificators, setModificators] = useState(initialModificatorsState);


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
        <S.Image src={img}>
            {!img && (
                <SvgIcon color={"white"} width={"80%"} style={{opacity: 0.05}}>
                    <LogoSvg/>
                </SvgIcon>
            )}

        </S.Image>
        <EqualHeightElement name={"product-name"}>
            <S.Name>{name}</S.Name>
            {mod_groups.map((group) => (
                <Switcher style={{marginTop: "12px"}}
                    handleChange={({option}) => {
                        setModificators(state => {
                            return {
                            ...state,
                             [group.property.id]: option.poster_id
                            }
                        })
                    }}
                    name={"modificator_" + group.property.id}
                    nameAccessor={"value"}
                    idAccessor={"poster_id"}
                    options={group.property.options}
                    selected={(option) => {
                        if(!option) {
                            return 0
                        }
                        return modificators[group.property.id] === option.poster_id;
                    }}/>
            ))}

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