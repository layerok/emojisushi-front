import * as S from "./styled";
import {FlexBox} from "~components/FlexBox";
import {Price} from "../../../../components/Price";
import {IngredientsTooltip} from "~components/tooltips/IngredientsTooltip";
import {EditCartButton} from "~components/buttons/EditCartButton";
import {CartModal} from "../../../../components/modals/CartModal";
import { observer} from "mobx-react";
import {
    getNameWithMods,
    getProductIngredients,
    getProductMainImage,
    getProductNewPrice,
    getProductOldPrice
} from "~utils/utils";
import {SvgIcon} from "~components/svg/SvgIcon";
import {LogoSvg} from "~components/svg/LogoSvg";
import {useCartStore} from "~hooks/use-cart-store";

const CheckoutCartRaw = () => {

    const CartStore = useCartStore();
    const {
      items
    } = CartStore;
    return <S.Wrapper>
              <div style={{
                maxHeight: '362px',
                overflowY: 'auto'
              }}>


                {items.map((item) => {
                    const { id, quantity, product } = item;
                    const ingredients = getProductIngredients(product);
                    const oldPrice = getProductOldPrice(product, item.variant);
                    const newPrice = getProductNewPrice(product, item.variant);
                    const img = getProductMainImage(product);
                    const nameWithMods = getNameWithMods(item);
                    const {weight} = product;
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
                                    {weight !== 0 && (
                                        <S.Delimiter/>
                                    ) }
                                    <S.Weight>{weight === 0 ? '': weight + 'г'} &nbsp;</S.Weight>
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
              </div>

            <CartModal>
                <S.EditButton>
                    <EditCartButton/>
                </S.EditButton>
            </CartModal>
        </S.Wrapper>;


}

export const CheckoutCart = observer(CheckoutCartRaw);
