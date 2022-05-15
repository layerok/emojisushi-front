import * as S from "./styled";
import {AddToCartButton} from "../AddToCartButton";
import {Price} from "../Price";
import {Favorite} from "../Favorite";
import {SvgIcon} from "../svg/SvgIcon";
import {InfoSvg} from "../svg/InfoSvg";

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
    return <S.Wrapper>
        <S.Favorite>
            <Favorite isFavorite={is_favorite}/>
        </S.Favorite>
        <S.Image src={image}/>
        <S.Name>{name}</S.Name>
        <S.Description>
            <S.Weight>{weight}</S.Weight>
            <SvgIcon width={"25px"} color={"#999"}>
                <InfoSvg/>
            </SvgIcon>
        </S.Description>
        <S.Footer>
            <Price oldPrice={old_price} newPrice={new_price}/>
            <AddToCartButton count={count} pending={pending}/>
        </S.Footer>
    </S.Wrapper>;
}