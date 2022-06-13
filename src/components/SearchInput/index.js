import {Input} from "../Input";
import * as S from "./styled";
import {SvgIcon} from "../svg/SvgIcon";
import {MagnifierSvg} from "../svg/MagnifierSvg";
import {useTranslation} from "react-i18next";
import {forwardRef} from "react";

export const SearchInput = forwardRef(({value = "", handleInput, ...rest}, ref) => {
    const {t} = useTranslation()
    return (
        <S.Search {...rest}>
            <Input ref={ref} value={value} onInput={handleInput} placeholder={t('search.input_search')}/>
            <S.IconBtn>
                <SvgIcon color={"white"} width={"25px"} height={"25px"}>
                    <MagnifierSvg/>
                </SvgIcon>
            </S.IconBtn>
        </S.Search>
    )
})