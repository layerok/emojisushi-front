import { CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";
import * as S from "./styled"
import {Button, ButtonDark} from "../../components/buttons/Button";

export const Profile = inject( 'AppStore')(observer((
    {
        AppStore
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    return (
        <CabinetLayout>
            <S.Heading>Личные данные</S.Heading>
            <S.NavWrapper>
                <S.TextWrapper>
                    <S.Left>

                        <S.NavText>Имя</S.NavText>
                        <S.NavText>E-mail</S.NavText>
                        <S.NavText>Телефон</S.NavText>
                        <S.NavText>Город</S.NavText>
                        <S.NavText>Адрес для доставок</S.NavText>
                    </S.Left>

                    <S.Right>
                        <S.PersonalData>Рудоманенко Владимир Павлович</S.PersonalData>
                        <S.PersonalData>kotopes231@gmail.com</S.PersonalData>
                        <S.PersonalData>+380 66 911 10 95</S.PersonalData>
                        <S.PersonalData>Одесса</S.PersonalData>
                        <S.PersonalData>Литвиненко-Вольгемут 1Г</S.PersonalData>
                    </S.Right>
                </S.TextWrapper>

                <S.BtnWrapper>
                    <ButtonDark minWidth={"309px"} >
                        Редактировать личные данные
                    </ButtonDark>
                    <S.BtnMargin>
                        <ButtonDark minWidth={"202px"}>
                            Изменить пароль
                        </ButtonDark>
                    </S.BtnMargin>

                </S.BtnWrapper>

            </S.NavWrapper>

            <S.BotMenu>
                <S.BirthHeading>Дата Рождения</S.BirthHeading>

                    <S.BirthText>День</S.BirthText>


            </S.BotMenu>

        </CabinetLayout>
    );
}))

