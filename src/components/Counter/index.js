import {SvgIcon} from "../svg/SvgIcon";
import {MinusSvg} from "../svg/MinusSvg";
import {PlusSvg} from "../svg/PlusSvg";
import * as S from "./styled";
import {ButtonFilled} from "../Button";
import {FlexBox} from "../FlexBox";

export const Counter = (
    {
        handleDecrement,
        handleIncrement,
        count = 0,
        countColor = "white",
        controlColor = "#4A4A4A",
        delimiterColor = "#333333"
    }) => {
    return (<FlexBox justifyContent={"center"} style={{width: '118px'}}>
        <SvgIcon width={"25px"}
                 onClick={handleDecrement}
                 color={controlColor}
                 style={{cursor: 'pointer', marginRight: '15px'}}>
            <MinusSvg/>
        </SvgIcon>
        <S.Count color={countColor} delimiterColor={delimiterColor}>
            {count}
        </S.Count>
        <SvgIcon width={"25px"}
                 onClick={handleIncrement}
                 color={controlColor}
                 style={{cursor: 'pointer', marginLeft: '15px'}}>
            <PlusSvg/>
        </SvgIcon>
    </FlexBox>)
}

export const ButtonCounter = (
    {
        count,
        handleIncrement,
        handleDecrement,
        width
    }
) => {
    return <ButtonFilled justifyContent={'space-around'} padding={"7px 0"} width={width}>
        <Counter
            count={count}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
            countColor={"black"}
            controlColor={"black"}
            delimiterColor={"#F1DA00"}
        />
    </ButtonFilled>
}