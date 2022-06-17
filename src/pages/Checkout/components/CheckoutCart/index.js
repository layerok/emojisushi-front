import * as S from "./styled";
import {FlexBox} from "../../../../components/FlexBox";
import {Price} from "../../../../components/Price";
import {IngredientsTooltip} from "../../../../components/tooltips/IngredientsTooltip";
import {CustomScrollbars} from "../../../../layout/CustomScrollbar";
import {EditCartButton} from "../../../../components/buttons/EditCartButton";
import {CartModal} from "../../../../components/modals/CartModal";
import {inject, observer} from "mobx-react";
import {
    getNameWithMods,
    getProductIngredients,
    getProductMainImage,
    getProductNewPrice,
    getProductOldPrice
} from "../../../../utils/utils";
import {SvgIcon} from "../../../../components/svg/SvgIcon";
import {LogoSvg} from "../../../../components/svg/LogoSvg";

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
                    const nameWithMods = getNameWithMods(item);
                    return <S.Item key={id}>
                        <S.Image src={img}>
                            {!img && (
                                <SvgIcon color={"white"} width={"80%"} style={{opacity: 0.05}}>
                                    <LogoSvg/>
                                </SvgIcon>
                            )}
                        </S.Image>

                        <S.Content>
                            <S.Name>{nameWithMods}</S.Name>
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