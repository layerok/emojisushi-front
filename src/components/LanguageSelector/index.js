import * as S from "./styled"

export const LanguageSelector = () => {

    return (

        <S.Selector>


            <S.Item id={"radio12"} type={"radio"}  value={"rad1"} name={"aaa"} checked onChange={() => {}}/>
            <S.ItemLabel htmlFor={"radio12"}>EN</S.ItemLabel>

            <S.Item id={"radio22"} type={"radio"} value={"rad2"} name={"aaa"} onChange={() => {}} />
            <S.ItemLabel htmlFor={"radio22"}>UA</S.ItemLabel>
        </S.Selector>
    )
}
