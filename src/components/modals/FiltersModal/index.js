import {Modal} from "../../Modal";
import {cloneElement} from "react";
import {CheckboxFilter} from "../../CheckboxFilter";
import * as S from "./styled";
import {SvgIcon} from "../../svg/SvgIcon";
import {MagnifierSvg} from "../../svg/MagnifierSvg";





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
                <CheckboxFilter>угорь</CheckboxFilter>
                <CheckboxFilter>avokado</CheckboxFilter>
                <CheckboxFilter>avokado sfdsfdfs</CheckboxFilter>
            </S.CheckboxWrapper>
        </S.Wrapper>
    )}>
        {cloneElement(children)}
    </Modal>

}