import {CabinetLayout} from "../../layout/CabinetLayout";
import {FormEvent, useEffect, useState} from "react";
import {observer} from "mobx-react";
import * as S from "./styled"
import {ButtonDark, ButtonOutline} from "~components/buttons/Button";
import {Dropdown} from "~components/Dropdown";
import {useAppStore} from "~hooks/use-app-store";
import {Input} from "~components/Input";
import {FlexBox} from "~components/FlexBox";
import {useAuthStore} from "~hooks/use-auth-store";
import {useNavigate} from "react-router-dom";
import {DAY_OPTIONS, MONTH_OPTIONS, SEX_OPTIONS, YEAR_OPTIONS} from "~pages/Profile/constants";
import {transaction} from "mobx";

const EditForm = observer(({
  cancelEditing
                  }: {
    cancelEditing: () => void;
}) => {

    const AuthStore = useAuthStore();
    const user = AuthStore.user;
    const customer = user.customer;

    return  <>
        <FlexBox justifyContent={'space-between'}>
            <Input
              style={{width: 'calc(50% - 10px)'}}
              label={"Їм'я"}  name={"name"}
              value={user.name}
              onInput={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  transaction(() => {
                      user.name = value;
                      if(customer) {
                          customer.firstName = value;
                      }
                  })
              }}

            />
            <Input style={{width: 'calc(50% - 10px)'}}
                   label={"Прізвище"}
                   name={"surname"}
                   value={user.surname}
                   onInput={(e) => {
                       const value = (e.target as HTMLInputElement).value;
                       transaction(() => {
                           user.surname = value;
                           if(customer) {
                               customer.lastName = value
                           }
                       })

                   }}
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
            <ButtonOutline loading={user.saving && customer?.saving} style={{
                marginRight: '16px'
            }} onClick={() => {
                transaction(() => {
                    user.save();
                    if(customer) {
                        customer.save();
                    }
                })

            }}>Сохранить</ButtonOutline>
            <ButtonDark onClick={() => {
                cancelEditing();
            }}>Відміна</ButtonDark>
        </FlexBox>

    </>
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
            <S.Property.Label>Имя</S.Property.Label>
            <S.Property.Value>{AuthStore.user.fullName}</S.Property.Value>
        </S.Property>

        <S.Property>
            <S.Property.Label>E-mail</S.Property.Label>
            <S.Property.Value>{AuthStore.user.email}</S.Property.Value>
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

