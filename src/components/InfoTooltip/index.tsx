import * as S from "./styled";
import {AnimatedTooltip} from "../tooltips/AnimatedTooltip";

export const InfoTooltip = ({
    children,
    label
                            }) => {
    return <AnimatedTooltip placement={"top-start"} label={
        <S.LabelWrapper>
            {label}
        </S.LabelWrapper>
    }>
        {children}
    </AnimatedTooltip>
}