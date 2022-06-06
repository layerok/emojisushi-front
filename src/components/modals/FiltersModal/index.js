import {cloneElement} from "react";
import {CheckboxFilter} from "../../CheckboxFilter";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {MagnifierSvg} from "../../svg/MagnifierSvg";
import {Modal} from "../Modal";



export const FiltersModal = ({children}) => {
    return <Modal render={({close}) => (
        <S.Wrapper>
            <S.FilterMagnifier>
                <S.Text>
                    Фильтры поиска
                </S.Text>
                <SvgIcon width={"25px"} style={{marginLeft: "13px"}}>
                    <MagnifierSvg/>
                </SvgIcon>
            </S.FilterMagnifier>
            <S.CheckboxWrapper>
                <CheckboxFilter>угорь</CheckboxFilter>
                <CheckboxFilter>тунец</CheckboxFilter>
                <CheckboxFilter>авокадо</CheckboxFilter>
                <CheckboxFilter>краб</CheckboxFilter>
                <CheckboxFilter>лосось слабосоленый</CheckboxFilter>
                <CheckboxFilter>креветка</CheckboxFilter>
                <CheckboxFilter>икра</CheckboxFilter>
                <CheckboxFilter>огурец</CheckboxFilter>
                <CheckboxFilter>фурикаке</CheckboxFilter>
                <CheckboxFilter>икра тобико</CheckboxFilter>
            </S.CheckboxWrapper>
        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>;

}