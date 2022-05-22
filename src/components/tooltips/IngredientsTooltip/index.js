import {SvgIcon} from "../../svg/SvgIcon";
import {InfoSvg} from "../../svg/InfoSvg";
import {AnimatedTooltip} from "../AnimatedTooltip";
import * as S from "./styled";

export const IngredientsTooltip = (
    {
        iconSize = "25px",
        items = []
    }
) => {

    const Content = () => {
        return <S.Wrapper>
            <S.Title>
                Ингридиенты
            </S.Title>
            <S.List>
                {items.map((item, i) =><S.ListItem key={i}>{item}</S.ListItem>)}
            </S.List>
        </S.Wrapper>
    }

    return <AnimatedTooltip placement={"bottom-start"} label={<Content/>}>
        <SvgIcon width={iconSize} color={"#999"}>
            <InfoSvg/>
        </SvgIcon>
    </AnimatedTooltip>
}