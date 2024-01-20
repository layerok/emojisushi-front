import * as S from "./styled";
import { useState } from "react";
import {
  PasswordInput,
  Checkbox,
  Button,
  Input,
  FlexBox,
  If,
  Modal,
} from "~components";
import { useBreakpoint2 } from "~common/hooks";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogin, useRegister } from "~hooks/use-auth";
import { AxiosError } from "axios";
import { queryClient } from "~query-client";
import { cartQuery, wishlistsQuery } from "~queries";
import { authApi } from "~api";
import { useMutation } from "@tanstack/react-query";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

export const AuthModal = NiceModal.create(
  ({ redirect_to }: { redirect_to?: string }) => {
    // todo: don't use it
    const { isMobile } = useBreakpoint2();
    const modal = useModal();

    const [showPasswordRecovery, setShowPasswordRecovery] = useState();
    const [showSignUp, setShowSignUp] = useState(false);
    const showLoginForm = isMobile
      ? !showPasswordRecovery && !showSignUp
      : !showPasswordRecovery;
    const showSignUpForm = !isMobile || showSignUp;

    return (
      <Modal
        open={modal.visible}
        onClose={() => {
          modal.remove();
        }}
        width={"auto"}
      >
        {({ close }) => (
          <S.Wrapper>
            <If condition={showLoginForm}>
              <LoginForm
                redirect_to={redirect_to}
                close={close}
                setShowSignUp={setShowSignUp}
                setShowPasswordRecovery={setShowPasswordRecovery}
              />
            </If>
            <If condition={showPasswordRecovery}>
              <PasswordRecoveryForm
                setShowPasswordRecovery={setShowPasswordRecovery}
              />
            </If>

            <S.VerticalBar />

            <If condition={showSignUpForm}>
              <SignUpForm close={close} setShowSignUp={setShowSignUp} />
            </If>
          </S.Wrapper>
        )}
      </Modal>
    );
  }
);

const SignUpForm = observer(({ setShowSignUp, close }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const register = useRegister();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
    name?: string[];
    surname?: string[];
    agree?: string[];
  }>({});

  return (
    <S.SignUpForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") + "";
        const password = formData.get("password") + "";
        const password_confirmation = formData.get("password") + "";
        const name = formData.get("name") + "";
        const surname = formData.get("surname") + "";
        const agree = !!formData.get("agree");

        setErrors({});

        register.mutate(
          {
            email,
            password,
            password_confirmation,
            name,
            surname,
            agree,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(wishlistsQuery.queryKey);
              queryClient.invalidateQueries(cartQuery.queryKey);
              navigate("/" + ["account", "profile"].join("/"));
              close();
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                setErrors(error.response.data.errors);
              }
            },
          }
        );
      }}
    >
      <S.Title>{t("authModal.registration.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.first_name")}</S.InputLabel>
        <Input name="name" error={errors?.name?.[0]} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.last_name")}</S.InputLabel>
        <Input name="surname" error={errors?.surname?.[0]} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input name="email" error={errors?.email?.[0]} light={true} />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput
          name="password"
          error={errors?.password?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <S.CheckboxWrapper>
        <Checkbox
          checked={checked}
          error={errors?.agree?.[0]}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          name="agree"
        >
          {t("common.privacyPolicyAgreed")}
        </Checkbox>
      </S.CheckboxWrapper>

      <FlexBox>
        <FlexBox flexDirection={"column"} alignItems={"center"}>
          <Button submitting={register.isLoading}>
            {t("common.registration")}
          </Button>

          <S.AuthButton
            style={{ paddingTop: "10px" }}
            onClick={(e) => {
              e.preventDefault();
              setShowSignUp(false);
            }}
          >
            {t("common.enter")}
          </S.AuthButton>
        </FlexBox>
      </FlexBox>
    </S.SignUpForm>
  );
});

const PasswordRecoveryForm = observer(({ setShowPasswordRecovery }) => {
  const { t } = useTranslation();

  const resetPassword = useMutation({
    mutationFn: (email: string) => {
      return authApi.restorePassword(email);
    },
  });

  const [errors, setErrors] = useState({
    email: [""],
  });
  const [isSent, setIsSent] = useState(false);
  return (
    <S.LoginForm
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") + "";

        resetPassword.mutate(email, {
          onSuccess: () => {
            setIsSent(true);
          },
          onError: (e) => {
            if (e instanceof AxiosError) {
              if (!e.response.data?.errors) {
                setErrors({
                  email: [e.response.data.message],
                });
              } else {
                setErrors(e.response.data.errors);
              }
            }
          },
        });
      }}
    >
      <S.Title>{t("authModal.forgetPassword.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input name={"email"} error={errors?.email?.[0]} light={true} />
      </S.InputWrapper>
      <If condition={isSent}>
        <S.ForgotPassText
          style={{
            color: "green",
          }}
        >
          {t("authModal.forgetPassword.mailSent")}
        </S.ForgotPassText>
      </If>
      <If condition={!isSent}>
        <S.ForgotPassText>
          {t("authModal.forgetPassword.typeEmail")}
        </S.ForgotPassText>
      </If>
      <S.BtnGroup>
        <S.ResetPasswordButton
          onClick={(e) => {
            setShowPasswordRecovery(false);
          }}
        >
          {t("common.back")}
        </S.ResetPasswordButton>
        <Button submitting={resetPassword.isLoading} type="submit">
          {t("common.recover")}
        </Button>
      </S.BtnGroup>
    </S.LoginForm>
  );
});

const LoginForm = ({
  setShowSignUp,
  setShowPasswordRecovery,
  close,
  redirect_to,
}) => {
  const { t } = useTranslation();

  const login = useLogin();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    email?: string[];
    password?: string[];
  }>({});

  return (
    <S.LoginForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string | null;
        const password = formData.get("password") as string | null;
        const default_redirect_to = "/" + ["account", "profile"].join("/");
        setErrors({});
        login.mutate(
          {
            email,
            password,
          },
          {
            onSuccess: () => {
              queryClient.invalidateQueries(wishlistsQuery.queryKey);
              queryClient.invalidateQueries(cartQuery.queryKey);
              navigate(redirect_to || default_redirect_to);
              close();
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                // todo: unify the error response
                if (!error.response.data.errors) {
                  setErrors({
                    email: [error.response.data.message],
                  });
                } else {
                  setErrors(error.response.data.errors);
                }
              }
            },
          }
        );
      }}
    >
      <S.Title>{t("authModal.login.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input name={"email"} error={errors?.email?.[0]} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput
          name={"password"}
          error={errors?.password?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <FlexBox justifyContent={"flex-end"}>
        <S.ResetPasswordButton
          style={{ paddingTop: "10px" }}
          onClick={(e) => {
            setShowPasswordRecovery(true);
          }}
        >
          {t("common.forgotPassword")}
        </S.ResetPasswordButton>
      </FlexBox>

      <Button
        submitting={login.isLoading}
        type="submit"
        style={{ marginTop: "20px", display: "flex" }}
      >
        {t("common.login")}
      </Button>

      <S.AuthButton
        style={{ paddingTop: "10px" }}
        onClick={(e) => {
          e.preventDefault();
          setShowSignUp(true);
        }}
      >
        {t("common.registration")}
      </S.AuthButton>
    </S.LoginForm>
  );
};
