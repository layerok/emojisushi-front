import {SvgIcon} from "../svg/SvgIcon";
import {MinusSvg} from "../svg/MinusSvg";
import {PlusSvg} from "../svg/PlusSvg";
import * as S from "./styled";
import {ButtonFilled} from "../Button";

export const Counter = (
    {
        count,
        handleIncrement,
        handleDecrement,
        width
    }
) => {
    return <ButtonFilled justifyContent={'space-around'} padding={"7px 0"} width={width}>
        <SvgIcon onClick={handleDecrement} color={"black"} style={{cursor: 'pointer'}}>
            <MinusSvg/>
        </SvgIcon>
        <S.Count>
            {count}
        </S.Count>
        <SvgIcon onClick={handleIncrement} color={"black"} style={{cursor: 'pointer'}}>
            <PlusSvg/>
        </SvgIcon>
    </ButtonFilled>
}