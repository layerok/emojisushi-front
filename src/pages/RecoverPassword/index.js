import {inject, observer} from "mobx-react";
import {useEffect} from "react";
import * as S from "./styled";
import {CabinetLayout} from "../../layout/CabinetLayout";
import {PasswordInput} from "../../components/PasswordInput";
import {ButtonOutline} from "../../components/buttons/Button";


export const RecoverPassword = inject( 'AppStore')(observer((
    {
        AppStore
    }) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    return (
        <CabinetLayout title={"Изменить пароль"}>


            <S.Form>
                <S.Text>Старый пароль</S.Text>
                <PasswordInput/>
                <S.Text>Новый пароль</S.Text>
                <PasswordInput/>
                <S.Text>Новый пароль ещё раз</S.Text>
                <PasswordInput/>
                <S.ButtonWrapper>
                    <ButtonOutline width={"224px"}>Изменить пароль</ButtonOutline>
                </S.ButtonWrapper>
            </S.Form>
        </CabinetLayout>
    )

}))