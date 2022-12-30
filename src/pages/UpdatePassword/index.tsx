import {observer, useLocalObservable} from "mobx-react";
import {useEffect} from "react";
import * as S from "./styled";
import {CabinetLayout} from "~layout/CabinetLayout";
import {PasswordInput} from "~components/PasswordInput";
import {ButtonOutline} from "~components/buttons/Button";
import {useAppStore} from "~hooks/use-app-store";
import authApi from "~api/auth.api";
import {transaction} from "mobx";
import {TextInputModel} from "~common/InputModel";
import {FormModel} from "~common/FormModel";

export const UpdatePassword = observer(() => {
    const AppStore = useAppStore();

    const state = useLocalObservable(() => ({
        form: new FormModel({
           fields: {
               password_old: new TextInputModel('password_old'),
               password: new TextInputModel('password'),
               password_confirmation: new TextInputModel('password'),
           },
            onSubmit(fields, done, error) {
                transaction(() => {
                    state.setSuccessMessageIntervalId(null);
                    state.setShowSuccessMessage(false);
                })
                authApi.updateUserPassword(state.form.asJson).then((res) => {
                    transaction(() => {
                        state.setShowSuccessMessage(true);
                        const id = setTimeout(() => {
                            state.setShowSuccessMessage(false);
                        }, 5000)
                        state.setSuccessMessageIntervalId(id);
                    })

                }).catch(e => {
                    error(e);
                }).finally(() => {
                    done(true);
                })
            }
        }),

        successMessageIntervalId: null,
        setSuccessMessageIntervalId(id: NodeJS.Timeout | null) {
            this.successMessageIntervalId = id;
        },
        showSuccessMessage: false,
        setShowSuccessMessage(state: boolean) {
            this.showSuccessMessage = state;
        }
    }))


    useEffect(() => {
        AppStore.setLoading(false);
    }, [AppStore])


    return (
      <CabinetLayout title={"Змінити пароль"}>
          <S.Form {...state.form.asProps}>
              <S.Text>Старий пароль</S.Text>
              <PasswordInput
                {...state.form.fields.password_old.asProps}
              />
              <S.Text>Новий пароль</S.Text>
              <PasswordInput
                {...state.form.fields.password.asProps}
              />
              <S.Text>Підтвердіть пароль</S.Text>
              <PasswordInput
                {...state.form.fields.password_confirmation.asProps}
              />
              <S.ButtonWrapper>
                  <ButtonOutline
                    {...state.form.asSubmitButtonProps}
                    width={"224px"}
                  >
                      Змінити пароль
                  </ButtonOutline>
              </S.ButtonWrapper>

              {state.showSuccessMessage && (
                <p style={{
                    marginTop: '10px',
                    color: 'green'
                }}>Пароль успішно змінено</p>
              )}
          </S.Form>
      </CabinetLayout>
    )

})
