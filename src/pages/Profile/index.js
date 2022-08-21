import { CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";
import * as S from "./styled"
import {ButtonDark, ButtonOutline} from "../../components/buttons/Button";
import {DropDown} from "../../components/DropDown";
import {Dropdown1} from "../../components/Dropdown1";

export const Profile = inject( 'AppStore')(observer((
    {
        AppStore,
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    const options = [
        {
            label: "1975",
            value: 1975
        },
        {
            label: "1976",
            value: 1976
        },
        {
            label: "1977",
            value: 1977
        },
        {
            label: "1978",
            value: 1978
        },
        {
            label: "1979",
            value: 1979
        },
        {
            label: "1980",
            value: 1980
        },
        {
            label: "1981",
            value: 1981
        },
        {
            label: "1982",
            value: 1982
        },
    ];


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
            <S.DropDownsWrapper>
                <S.BirthWrapper>
                    <S.BirthText>День</S.BirthText>
                    <DropDown initialValue={"1"} options={[1,2,3,3,4]}> </DropDown>
                    <Dropdown1 options={options}/>

                </S.BirthWrapper>
            <S.BirthWrapper>
                <S.BirthText>Месяц</S.BirthText>
                <DropDown width={"128px"} initialValue={"Январь"} options={["Январь","Февраль","Март","Апрель",]}> </DropDown>

            </S.BirthWrapper>

                <S.BirthWrapper>
                    <S.BirthText>Год</S.BirthText>
                    <DropDown width={"128px"} initialValue={"2000"} options={["2000","2001","2002","2002"]}> </DropDown>

                </S.BirthWrapper>

            </S.DropDownsWrapper>
            <S.SexWrapper>
                <S.Heading>Пол</S.Heading>
                <DropDown marginTop={"20px"} width={"128px"} starter={"Мужской"} options={["Мужской","Женский"]}> </DropDown>

            </S.SexWrapper>

            <S.HorizontalBar></S.HorizontalBar>

                <ButtonOutline>Сохранить</ButtonOutline>
            </S.BotMenu>

        </CabinetLayout>
    );
}))

