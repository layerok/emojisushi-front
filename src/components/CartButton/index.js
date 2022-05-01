import * as S from "./styled";
import {BagIcon} from "../BagIcon";
import {FlexBox} from "../FlexBox";

export const CartButton = () => {
    return (
        <S.CartButton>
            <FlexBox alignItems={"center"}>
                <S.Icon>
                    <BagIcon/>
                </S.Icon>
                <S.Price>
                    308 ₴
                </S.Price>
                <S.Delimiter/>
                <S.Count>
                    2
                </S.Count>
            </FlexBox>
        </S.CartButton>
    );
}