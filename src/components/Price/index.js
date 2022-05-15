import {FlexBox} from "../FlexBox";
import * as S from "./styled";

export const Price = (
    {
        oldPrice,
        newPrice,
        isSale,
    }
) => {
    return (<FlexBox flexDirection={"column"}>
        {oldPrice && (
            <S.OldPrice>
                {oldPrice}
            </S.OldPrice>
        )}
        <S.NewPrice>
            {newPrice}
        </S.NewPrice>
    </FlexBox>)
}