import {SvgIcon} from "../svg/SvgIcon";
import {MinusSvg} from "../svg/MinusSvg";
import {PlusSvg} from "../svg/PlusSvg";
import * as S from "./styled";

export const Counter = (
    {
        count,
        handleIncrement,
        handleDecrement
    }
) => {
    return <S.Wrapper>
        <SvgIcon onClick={handleDecrement} color={"black"} style={{cursor: 'pointer'}}>
            <MinusSvg/>
        </SvgIcon>
        <S.Count>
            {count}
        </S.Count>
        <SvgIcon onClick={handleIncrement} color={"black"} style={{cursor: 'pointer'}}>
            <PlusSvg/>
        </SvgIcon>
    </S.Wrapper>
}