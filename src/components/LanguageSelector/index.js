import * as S from "./styled"

export const LanguageSelector = () => {

    return (

        <S.Selector>


            <S.Item id={"radio12"} type={"radio"}  value={"rad1"} name={"aaa"} checked/>
            <S.ItemLabel for={"radio12"}>EN</S.ItemLabel>

            <S.Item id={"radio22"} type={"radio"} value={"rad2"} name={"aaa"} />
            <S.ItemLabel for={"radio22"}>UA</S.ItemLabel>
        </S.Selector>
    )
}