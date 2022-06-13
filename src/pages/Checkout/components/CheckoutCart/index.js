import * as S from "./styled";
import {FlexBox} from "../../../../components/FlexBox";
import {Price} from "../../../../components/Price";
import {IngredientsTooltip} from "../../../../components/tooltips/IngredientsTooltip";
import {CustomScrollbars} from "../../../../layout/CustomScrollbar";
import {EditCartButton} from "../../../../components/buttons/EditCartButton";
import {CartModal} from "../../../../components/modals/CartModal";
import {inject, observer} from "mobx-react";
import {
    getProductIngredients,
    getProductMainImage,
    getProductNewPrice,
    getProductOldPrice
} from "../../../../utils/utils";

const CheckoutCartRaw = (
    {
        CartStore: {
            items
        }
    }
) => {


    return <S.Wrapper>
            <CustomScrollbars height={362}>
                {items.map((item) => {
                    const { id, quantity, product } = item;
                    const ingredients = getProductIngredients(product);
                    const oldPrice = getProductOldPrice(product);
                    const newPrice = getProductNewPrice(product);
                    const img = getProductMainImage(product);
                    return <S.Item key={id}>
                        <S.Image src={img}/>
                        <S.Content>
                            <S.Name>{product.name}</S.Name>
                            <S.Description>
                                <FlexBox>
                                    <S.Count>{quantity} шт</S.Count>
                                    <S.Delimiter/>
                                    <S.Weight>{product.weight} г</S.Weight>
                                </FlexBox>
                                {ingredients.length > 0 && (
                                    <IngredientsTooltip items={ingredients}/>
                                    )}

                            </S.Description>
                            <S.Price>
                                <Price newPrice={newPrice} oldPrice={oldPrice}/>
                            </S.Price>
                        </S.Content>
                    </S.Item>
                })}

            </CustomScrollbars>
            <CartModal>
                <S.EditButton>
                    <EditCartButton/>
                </S.EditButton>
            </CartModal>
        </S.Wrapper>;


}

export const CheckoutCart = inject('CartStore', 'PaymentStore', 'ShippingStore')(observer(CheckoutCartRaw));