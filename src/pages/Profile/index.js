import {CabinetLayout} from "../../layout/CabinetLayout";
import {useEffect} from "react";
import {inject, observer} from "mobx-react";
import * as S from "./styled"
import {ButtonDark, ButtonOutline} from "../../components/buttons/Button";
import {DropDown} from "../../components/DropDown";


export const Profile = inject( 'AppStore')(observer((
    {
        AppStore,
    }
) => {

    useEffect(() => {
        AppStore.setLoading(false);
    }, [])



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
                        <DropDown initialValue={"1"} options={[1,2,3,3,4]}> </DropDown>

                    </S.Birth.Property>
                    <S.Birth.Property>
                        <S.Birth.Label>Месяц</S.Birth.Label>
                        <DropDown width={"128px"} initialValue={"Январь"} options={["Январь","Февраль","Март","Апрель",]}> </DropDown>

                    </S.Birth.Property>

                    <S.Birth.Property>
                        <S.Birth.Label>Год</S.Birth.Label>
                        <DropDown width={"107px"} initialValue={"2000"} options={["2000","2001","2002","2002"]}> </DropDown>

                    </S.Birth.Property>

                </S.Birth.Properties>

            </S.Birth>

            <S.Sex>
                <S.Sex.Label>Пол</S.Sex.Label>
                <DropDown marginTop={"20px"} width={"128px"} starter={"Мужской"} options={["Мужской","Женский"]}> </DropDown>
            </S.Sex>

            <S.HorizontalBar/>

            <ButtonOutline>Сохранить</ButtonOutline>

        </CabinetLayout>
    );
}))

