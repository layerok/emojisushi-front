import {observer, useLocalObservable} from "mobx-react";
import {useEffect} from "react";
import * as S from "./styled";
import {CabinetLayout} from "../../layout/CabinetLayout";
import {PasswordInput} from "~components/PasswordInput";
import {ButtonOutline} from "~components/buttons/Button";
import {useAppStore} from "~hooks/use-app-store";
import authApi from "~api/auth.api";
import {makeAutoObservable, transaction} from "mobx";

type InputModelOptions = {
    value?: string;
    error?: string;
}

class InputModel {
    value: string;
    error: string;
    constructor({
                    value = "",
                    error = ""
                }: InputModelOptions = {}) {
        makeAutoObservable(this);
        this.value = value;
        this.error = error;
    }

    setError(error: string) {
        this.error = error;
    }

    setValue(value: string) {
        this.value = value;
    }
}

export const UpdatePassword = observer(() => {
    const AppStore = useAppStore();
    const state = useLocalObservable(() => ({
        loading: false,
        setLoading(state: boolean) {
            this.loading = state;
        },
        password_old: new InputModel(),
        password: new InputModel(),
        password_confirmation: new InputModel(),
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
          <S.Form onSubmit={(e) => {
              state.password_confirmation.setError('');
              state.password.setError('');
              state.password_old.setError('');
              e.preventDefault();
          }}>
              <S.Text>Старий пароль</S.Text>
              <PasswordInput
                value={state.password_old.value}
                error={state.password_old.error}
                name={'password_old'}
                onChange={(e) => {
                    transaction(() => {
                        state.password_old.setError('');
                        state.password_old.setValue((e.target as HTMLInputElement).value)
                    })
                }}
              />
              <S.Text>Новий пароль</S.Text>
              <PasswordInput
                value={state.password.value}
                error={state.password.error}
                name={'password'}
                onChange={(e) => {
                    transaction(() => {
                        state.password.setError('');
                        state.password.setValue((e.target as HTMLInputElement).value)
                    })
                }}
              />
              <S.Text>Підтвердіть пароль</S.Text>
              <PasswordInput
                error={state.password_confirmation.error}
                value={state.password_confirmation.value}
                name={'password_confirmation'}
                onChange={(e) => {
                    transaction(() => {
                        state.password_confirmation.setError('');
                        state.password_confirmation.setValue((e.target as HTMLInputElement).value)
                    })
                }}
              />
              <S.ButtonWrapper onClick={() => {
                  transaction(() => {
                      state.setLoading(true);
                      state.setSuccessMessageIntervalId(null);
                      state.setShowSuccessMessage(false);
                  })
                  authApi.updateUserPassword({
                      password_old: state.password_old.value,
                      password: state.password.value,
                      password_confirmation: state.password_confirmation.value
                  }).then((res) => {
                      transaction(() => {
                          state.setShowSuccessMessage(true);
                          state.password_confirmation.setValue('');
                          state.password.setValue('');
                          state.password_old.setValue('');
                          const id = setTimeout(() => {
                              state.setShowSuccessMessage(false);
                          }, 5000)
                          state.setSuccessMessageIntervalId(id);
                      })

                  }).catch(e => {
                      const {errors, message} = e.response.data;
                      if(errors) {
                          Object.keys(errors).forEach((key) => {
                              if(key === 'password') {
                                  state.password.setError(errors[key][0]);
                              }
                              if(key === 'password_old') {
                                  state.password_old.setError(errors[key][0]);
                              }
                              if(key === 'password_confirmation') {
                                  state.password_confirmation.setError(errors[key][0]);
                              }
                          })
                      }
                  }).finally(() => {
                      state.setLoading(false);
                  })
              }}>
                  <ButtonOutline
                    loading={state.loading}
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
