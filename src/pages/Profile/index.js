import {CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import {observer} from "mobx-react";
import * as S from "./styled"
import {ButtonDark, ButtonOutline} from "../../components/buttons/Button";
import {Dropdown} from "../../components/Dropdown";
import {useAppStore} from "../../hooks/use-app-store";

export const Profile = observer(() => {
    const AppStore = useAppStore();
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    const dayOptions = [
        {
            label: "1",
            value: 1
        },
        {
            label: "2",
            value: 2
        },
        {
            label: "3",
            value: 3
        },
        {
            label: "4",
            value: 4
        },
        {
            label: "5",
            value: 5
        },
        {
            label: "6",
            value: 6
        },
        {
            label: "7",
            value: 7
        },
        {
            label: "8",
            value: 8
        },
    ];

    const monthOptions = [
        {
            label: "1",
            value: 1
        },
        {
            label: "2",
            value: 2
        },
        {
            label: "3",
            value: 3
        },
        {
            label: "4",
            value: 4
        },
        {
            label: "5",
            value: 5
        },
        {
            label: "6",
            value: 6
        },
        {
            label: "7",
            value: 7
        },
        {
            label: "8",
            value: 8
        },
        {
            label: "9",
            value: 9
        },
        {
            label: "10",
            value: 10
        },
        {
            label: "11",
            value: 11
        },
        {
            label: "12",
            value: 12
        },
    ];

    const yearOptions = [
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

    const sexOptions = [
        {
            label: "Myжской",
            value: "male"
        },
        {
            label: "Женский",
            value: "female"
        },
    ]


    return (
        <CabinetLayout title={"Личные данные"}>
            <S.Properties>

                <S.Property>
                    <S.Property.Label>Имя</S.Property.Label>
                    <S.Property.Value>Рудоманенко Владимир Павлович</S.Property.Value>
                </S.Property>

                <S.Property>
                    <S.Property.Label>E-mail</S.Property.Label>
                    <S.Property.Value>kotopes231@gmail.com</S.Property.Value>
                </S.Property>

                <S.Property>
                    <S.Property.Label>Телефон</S.Property.Label>
                    <S.Property.Value>+380 66 911 10 95</S.Property.Value>
                </S.Property>

                <S.Property>
                    <S.Property.Label>Город</S.Property.Label>
                    <S.Property.Value >Одесса</S.Property.Value>
                </S.Property>

                <S.Property>
                    <S.Property.Label>Адрес для доставок</S.Property.Label>
                    <S.Property.Value >Литвиненко-Вольгемут 1Г</S.Property.Value>
                </S.Property>



                <S.BtnGroup>
                    <ButtonDark minWidth={"309px"} >
                        Редактировать личные данные
                    </ButtonDark>
                    <S.BtnWrapper>
                        <ButtonDark minWidth={"202px"}>
                            Изменить пароль
                        </ButtonDark>
                    </S.BtnWrapper>
                </S.BtnGroup>

            </S.Properties>

            <S.Birth>
                <S.Birth.Heading>Дата Рождения</S.Birth.Heading>
                <S.Birth.Properties>
                    <S.Birth.Property>
                        <S.Birth.Label>День</S.Birth.Label>
                        <Dropdown
                            width={"100px"}
                            initiallySelectedValue={1}
                            options={dayOptions}
                        />

                    </S.Birth.Property>
                    <S.Birth.Property>
                        <S.Birth.Label>Месяц</S.Birth.Label>
                        <Dropdown width={"128px"}
                                  initiallySelectedValue={1}
                                  options={monthOptions}
                        />

                    </S.Birth.Property>

                    <S.Birth.Property>
                        <S.Birth.Label>Год</S.Birth.Label>
                        <Dropdown
                            width={"107px"}
                            initiallySelectedValue={1976}
                            options={yearOptions}
                        />

                    </S.Birth.Property>

                </S.Birth.Properties>

            </S.Birth>

            <S.Sex>
                <S.Sex.Label>Пол</S.Sex.Label>
                <Dropdown
                    width={"128px"}
                    initiallySelectedValue={"male"}
                    options={sexOptions}
                />
            </S.Sex>

            <S.HorizontalBar/>

            <ButtonOutline>Сохранить</ButtonOutline>

        </CabinetLayout>
    );
})

