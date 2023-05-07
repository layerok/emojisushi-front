import { observer, useLocalObservable } from "mobx-react";
import * as S from "./styled";
import { ButtonOutline, PasswordInput } from "~components";
import { authApi } from "~api";
import { transaction } from "mobx";
import { useTranslation } from "react-i18next";
import { requireUser } from "~utils/loader.utils";
import {
  ActionFunctionArgs,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useEffect } from "react";
import { AxiosError } from "axios";

type UpdatePasswordPageActionData = {
  ok?: boolean;
  errors?: {
    password: string[];
    password_old: string[];
    password_confirmation: string[];
  };
};

const getError = (error: string | string[] | undefined) => {
  if (Array.isArray(error)) {
    return error[0];
  }
  return error;
};

export const UpdatePasswordPage = observer(() => {
  const { t } = useTranslation();
  const actionData = useActionData() as UpdatePasswordPageActionData;

  const state = useLocalObservable(() => ({
    successMessageIntervalId: null,
    setSuccessMessageIntervalId(id: NodeJS.Timeout | null) {
      this.successMessageIntervalId = id;
    },
    showSuccessMessage: false,
    setShowSuccessMessage(state: boolean) {
      this.showSuccessMessage = state;
    },
  }));

  useEffect(() => {
    if (actionData?.ok) {
      state.setShowSuccessMessage(true);
      const id = setTimeout(() => {
        state.setShowSuccessMessage(false);
      }, 5000);
      state.setSuccessMessageIntervalId(id);
    }
  }, [actionData]);

  const navigation = useNavigation();

  return (
    <>
      <S.Container>
        <Form
          method="post"
          onSubmit={() => {
            transaction(() => {
              state.setSuccessMessageIntervalId(null);
              state.setShowSuccessMessage(false);
            });
          }}
        >
          <S.Text>{t("common.oldPassword")}</S.Text>
          <PasswordInput
            name="password_old"
            error={getError(actionData?.errors?.password_old)}
          />
          <S.Text>{t("common.newPassword")}</S.Text>
          <PasswordInput
            name="password"
            error={getError(actionData?.errors?.password)}
          />
          <S.Text>{t("common.confirmPassword")}</S.Text>
          <PasswordInput
            name="password_confirmation"
            error={getError(actionData?.errors?.password_confirmation)}
          />
          <S.ButtonWrapper>
            <ButtonOutline
              type="submit"
              submitting={navigation.state === "submitting"}
              width={"224px"}
            >
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
        </Form>
      </S.Container>
    </>
  );
});

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = formData.get("password");
  const password_old = formData.get("password_old");
  const password_confirmation = formData.get("password_confirmation");

  try {
    await authApi.updateUserPassword({
      password: password + "",
      password_confirmation: password_confirmation + "",
      password_old: password_old + "",
    });
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      return {
        errors: e.response.data.errors,
      };
    }
  }

  return {
    ok: true,
  };
};

export const loader = async () => {
  const user = await requireUser();
  return {
    user,
  };
};

export const Component = UpdatePasswordPage;
Object.assign(Component, {
  displayName: "LazyUpdatePasswordPage",
});
