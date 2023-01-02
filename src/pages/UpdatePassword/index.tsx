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
import {useTranslation} from "react-i18next";

export const UpdatePassword = observer(() => {
    const AppStore = useAppStore();
    const {t} = useTranslation();

    const state = useLocalObservable(() => ({
        form: new FormModel({
           fields: {
               password_old: new TextInputModel('password_old'),
               password: new TextInputModel('password'),
               password_confirmation: new TextInputModel('password_confirmation'),
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
      <CabinetLayout title={t('account.changePassword.title')}>
          <S.Form {...state.form.asProps}>
              <S.Text>{t('common.oldPassword')}</S.Text>
              <PasswordInput
                {...state.form.fields.password_old.asProps}
              />
              <S.Text>{t('common.newPassword')}</S.Text>
              <PasswordInput
                {...state.form.fields.password.asProps}
              />
              <S.Text>{t('common.confirmPassword')}</S.Text>
              <PasswordInput
                {...state.form.fields.password_confirmation.asProps}
              />
              <S.ButtonWrapper>
                  <ButtonOutline
                    {...state.form.asSubmitButtonProps}
                    width={"224px"}
                  >
                      {t('account.changePassword.btnText')}
                  </ButtonOutline>
              </S.ButtonWrapper>

              {state.showSuccessMessage && (
                <p style={{
                    marginTop: '10px',
                    color: 'green'
                }}>{t('account.changePassword.successMessage')}</p>
              )}
          </S.Form>
      </CabinetLayout>
    )

})
