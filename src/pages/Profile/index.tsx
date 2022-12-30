import {CabinetLayout} from "~layout/CabinetLayout";
import {useEffect, useState} from "react";
import {observer, useLocalObservable} from "mobx-react";
import * as S from "./styled"
import {ButtonDark, ButtonOutline} from "~components/buttons/Button";
import {Dropdown} from "~components/Dropdown";
import {useAppStore} from "~hooks/use-app-store";
import {Input} from "~components/Input";
import {FlexBox} from "~components/FlexBox";
import {useAuthStore} from "~hooks/use-auth-store";
import {useNavigate} from "react-router-dom";
import {DAY_OPTIONS, MONTH_OPTIONS, SEX_OPTIONS, YEAR_OPTIONS} from "~pages/Profile/constants";

import {FormModel} from "~common/FormModel";
import {TextInputModel} from "~common/InputModel";

const EditForm = observer(({
  cancelEditing
                  }: {
    cancelEditing: () => void;
}) => {

    const AuthStore = useAuthStore();
    const user = AuthStore.user;
    const customer = user.customer;

    const form = useLocalObservable(() => new FormModel({
        fields: {
            name: new TextInputModel('name', {
                value: user.name
            }),
            surname: new TextInputModel('surname', {
                value: user.surname
            }),
            phone: new TextInputModel('phone', {
                value: user.phone
            })
        },
        onSubmit(fields, done, error) {
            user.name = fields.name.value;
            customer.firstName = fields.name.value;
            user.surname = fields.surname.value;
            customer.lastName = fields.surname.value
            user.phone = fields.phone.value;

            user.save().then(() => {
                cancelEditing();
            }).catch((e) => {
                error(e)
            }).finally(() => {
                done()
            })

        }
    }))

    return  <form {...form.asProps}>
        <FlexBox justifyContent={'space-between'}>
            <Input
              style={{width: 'calc(50% - 10px)'}}
              label={"Їм'я"}
              {...form.fields.name.asProps}

            />
            <Input style={{width: 'calc(50% - 10px)'}}
                   label={"Прізвище"}
                   {...form.fields.surname.asProps}
            />
        </FlexBox>
        <FlexBox justifyContent={'space-between'} style={{
            marginTop: '10px'
        }}>
            <Input
              style={{width: 'calc(50% - 10px)'}}
              label={"Email"}
              name={"email"}
              value={AuthStore.user.email}
              disabled={true}
            />
            <Input
              style={{width: 'calc(50% - 10px)'}}
              label={"Телефон"}
              {...form.fields.phone.asProps}
            />
        </FlexBox>


{/*        <S.Birth>
            <S.Birth.Heading>Дата Рождения</S.Birth.Heading>
            <S.Birth.Properties>
                <S.Birth.Property>
                    <S.Birth.Label>День</S.Birth.Label>
                    <Dropdown
                      width={"100px"}
                      initiallySelectedValue={1}
                      options={DAY_OPTIONS}
                    />

                </S.Birth.Property>
                <S.Birth.Property>
                    <S.Birth.Label>Месяц</S.Birth.Label>
                    <Dropdown width={"128px"}
                              initiallySelectedValue={1}
                              options={MONTH_OPTIONS}
                    />

                </S.Birth.Property>

                <S.Birth.Property>
                    <S.Birth.Label>Год</S.Birth.Label>
                    <Dropdown
                      width={"107px"}
                      initiallySelectedValue={1976}
                      options={YEAR_OPTIONS}
                    />

                </S.Birth.Property>

            </S.Birth.Properties>

        </S.Birth>

        <S.Sex>
            <S.Sex.Label>Пол</S.Sex.Label>
            <Dropdown
              width={"128px"}
              initiallySelectedValue={"male"}
              options={SEX_OPTIONS}
            />
        </S.Sex>

        <S.HorizontalBar/>*/}

        <FlexBox style={{
            marginTop: '30px'
        }}>
            <ButtonOutline {...form.asSubmitButtonProps} style={{
                marginRight: '16px'
            }} >Сохранить</ButtonOutline>
            <ButtonDark onClick={() => {
                cancelEditing();
            }}>Скасувати</ButtonDark>
        </FlexBox>

    </form>
})

const ProfilePreview = ({
  startEditing
                        }: {
    startEditing: () => void;
}) => {

    const AuthStore = useAuthStore();
    const navigate = useNavigate();

    return <S.Properties>

        <S.Property>
            <S.Property.Label>Ім'я</S.Property.Label>
            <S.Property.Value>{AuthStore.user.fullName}</S.Property.Value>
        </S.Property>

        <S.Property>
            <S.Property.Label>E-mail</S.Property.Label>
            <S.Property.Value>{AuthStore.user.email}</S.Property.Value>
        </S.Property>
        <S.Property>
            <S.Property.Label>Телефон</S.Property.Label>
            <S.Property.Value>{AuthStore.user.phone}</S.Property.Value>
        </S.Property>

        <S.BtnGroup>
            <ButtonDark onClick={() => {
                startEditing();
            }} minWidth={"309px"} >
                Редактировать личные данные
            </ButtonDark>
            <S.BtnWrapper>
                <ButtonDark onClick={() => {
                    navigate('/account/recover-password')
                }} minWidth={"202px"}>
                    Изменить пароль
                </ButtonDark>
            </S.BtnWrapper>
        </S.BtnGroup>

    </S.Properties>
}

export const Profile = observer(() => {
    const AppStore = useAppStore();
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    useEffect(() => {
        AppStore.setLoading(false);
    }, [])

    return (
      <CabinetLayout title={"Личные данные"}>
          {editModeEnabled ? (
            <EditForm cancelEditing={() => setEditModeEnabled(false)}/>
          ): (
            <ProfilePreview startEditing={() => setEditModeEnabled(true)}/>
          )}
      </CabinetLayout>
    );
})

