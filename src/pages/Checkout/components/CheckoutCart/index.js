import * as S from "./styled";
import {FlexBox} from "../../../../components/FlexBox";
import {Price} from "../../../../components/Price";
import {IngredientsTooltip} from "../../../../components/tooltips/IngredientsTooltip";
import {CustomScrollbars} from "../../../../layout/CustomScrollbar";
import {products} from "../../../../common/mock/data/products";
import {EditCartButton} from "../../../../components/buttons/EditCartButton";
import {CartModal} from "../../../../components/modals/CartModal";

export const CheckoutCart = () => {
    return <S.Wrapper>
            <CustomScrollbars height={362}>
                {products.map(({name, image, weight, ingredients,old_price, new_price, id}) => (
                    <S.Item key={id}>
                        <S.Image src={image}/>
                        <S.Content>
                            <S.Name>{name}</S.Name>
                            <S.Description>
                                <FlexBox>
                                    <S.Count>1 шт</S.Count>
                                    <S.Delimiter/>
                                    <S.Weight>{weight}</S.Weight>
                                </FlexBox>
                                <IngredientsTooltip items={ingredients}/>
                            </S.Description>
                            <S.Price>
                                <Price newPrice={new_price} oldPrice={old_price}/>
                            </S.Price>
                        </S.Content>
                    </S.Item>
                ))}

            </CustomScrollbars>
            <CartModal>
                <S.EditButton>
                    <EditCartButton/>
                </S.EditButton>
            </CartModal>
        </S.Wrapper>;


}