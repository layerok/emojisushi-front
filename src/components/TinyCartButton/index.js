import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {BagSvg} from "../svg/BagSvg";

export const TinyCartButton = (
    {
        price
    }
) => {
    return (
        <S.TinyCartButton>
        <S.Icon>
            <SvgIcon color={"white"}>
                <BagSvg/>
            </SvgIcon>
        </S.Icon>
        <S.Price>
            {price}
        </S.Price>
        </S.TinyCartButton>
    );
}