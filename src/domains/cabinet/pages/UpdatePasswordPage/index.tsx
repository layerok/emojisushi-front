import { observer, useLocalObservable } from "mobx-react";
import * as S from "./styled";
import { ButtonOutline, PasswordInput } from "~components";
import { authApi } from "~api";
import { transaction } from "mobx";
import { TextInputModel, FormModel } from "~common/models";
import { useTranslation } from "react-i18next";

export const UpdatePasswordPage = observer(() => {
  const { t } = useTranslation();

  const state = useLocalObservable(() => ({
    form: new FormModel({
      fields: {
        password_old: new TextInputModel("password_old"),
        password: new TextInputModel("password"),
        password_confirmation: new TextInputModel("password_confirmation"),
      },
      onSubmit(fields, done, error) {
        transaction(() => {
          state.setSuccessMessageIntervalId(null);
          state.setShowSuccessMessage(false);
        });
        authApi
          .updateUserPassword(state.form.asJson)
          .then((res) => {
            transaction(() => {
              state.setShowSuccessMessage(true);
              const id = setTimeout(() => {
                state.setShowSuccessMessage(false);
              }, 5000);
              state.setSuccessMessageIntervalId(id);
            });
          })
          .catch((e) => {
            error(e);
          })
          .finally(() => {
            done(true);
          });
      },
    }),

    successMessageIntervalId: null,
    setSuccessMessageIntervalId(id: NodeJS.Timeout | null) {
      this.successMessageIntervalId = id;
    },
    showSuccessMessage: false,
    setShowSuccessMessage(state: boolean) {
      this.showSuccessMessage = state;
    },
  }));

  return (
    <>
      <S.Form {...state.form.asProps}>
        <S.Text>{t("common.oldPassword")}</S.Text>
        <PasswordInput {...state.form.fields.password_old.asProps} />
        <S.Text>{t("common.newPassword")}</S.Text>
        <PasswordInput {...state.form.fields.password.asProps} />
        <S.Text>{t("common.confirmPassword")}</S.Text>
        <PasswordInput {...state.form.fields.password_confirmation.asProps} />
        <S.ButtonWrapper>
          <ButtonOutline {...state.form.asSubmitButtonProps} width={"224px"}>
            {t("account.changePassword.btnText")}
          </ButtonOutline>
        </S.ButtonWrapper>

        {state.showSuccessMessage && (
          <p
            style={{
              marginTop: "10px",
              color: "green",
            }}
          >
            {t("account.changePassword.successMessage")}
          </p>
        )}
      </S.Form>
    </>
  );
});

export const Component = UpdatePasswordPage;
Object.assign(Component, {
  displayName: "LazyUpdatePasswordPage",
});
