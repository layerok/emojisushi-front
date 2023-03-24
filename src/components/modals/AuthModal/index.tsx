import { Modal } from "../Modal";
import * as S from "./styled";
import { cloneElement, useState } from "react";
import { Input } from "../../Input";
import { Button } from "../../buttons/Button";
import { Checkbox } from "../../Checkbox";
import { PasswordInput } from "../../PasswordInput";
import { useBreakpoint, useIsMobile } from "~common/hooks/useBreakpoint";
import { FlexBox } from "../../FlexBox";
import AuthApi from "../../../api/auth.api";
import authApi from "../../../api/auth.api";
import { observer, useLocalObservable } from "mobx-react";
import { runInAction, transaction } from "mobx";
import { stores } from "~stores/stores";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FormModel } from "~common/FormModel";
import { CheckboxInputModel, TextInputModel } from "~common/InputModel";
import { useTranslation } from "react-i18next";
import { If } from "~components/If";
import { useCity, useSpot } from "~hooks";

export const AuthModal = ({ children }) => {
  const isMobile = useIsMobile();

  const [showPasswordRecovery, setShowPasswordRecovery] = useState();
  const [showSignUp, setShowSignUp] = useState(false);
  const showLoginForm = isMobile
    ? !showPasswordRecovery && !showSignUp
    : !showPasswordRecovery;
  const showSignUpForm = !isMobile || showSignUp;

  return (
    <Modal
      width={isMobile ? "350px" : "675px"}
      render={({ close }) => (
        <S.Wrapper>
          <If condition={showLoginForm}>
            <LoginForm
              setShowSignUp={setShowSignUp}
              setShowPasswordRecovery={setShowPasswordRecovery}
            />
          </If>
          <If condition={showPasswordRecovery}>
            <PasswordRecoveryForm
              setShowPasswordRecovery={setShowPasswordRecovery}
            />
          </If>
          <If condition={!isMobile}>
            <S.VerticalBar />
          </If>
          <If condition={showSignUpForm}>
            <SignUpForm setShowSignUp={setShowSignUp} />
          </If>
        </S.Wrapper>
      )}
    >
      {cloneElement(children)}
    </Modal>
  );
};

const SignUpForm = observer(({ setShowSignUp }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const navigate = useNavigate();
  const city = useCity();
  const spot = useSpot();

  const state = useLocalObservable(() => ({
    form: new FormModel({
      fields: {
        name: new TextInputModel("name"),
        surname: new TextInputModel("surname"),
        email: new TextInputModel("email"),
        password: new TextInputModel("password"),
        agree: new CheckboxInputModel("agree"),
      },
      onSubmit(fields, done, error) {
        AuthApi.register({
          email: fields.email.value,
          password: fields.password.value,
          password_confirmation: fields.password.value,
          name: fields.name.value,
          surname: fields.surname.value,
          agree: fields.agree.checked,
        })
          .then(() => {
            return AuthApi.login({
              email: fields.email.value,
              password: fields.password.value,
            })
              .then((res) => {
                const { token, expires, user } = res.data.data;
                Cookies.set("jwt", token);
                transaction(() => {
                  stores.AuthStore.setAuthToken(token);
                  stores.AuthStore.userFromJson(user);
                  stores.AuthStore.setExpires(expires);
                });
                navigate(
                  "/" + city.slug + "/" + spot.slug + "/account/profile"
                );
              })
              .finally(() => {
                done();
              });
          })
          .catch((e) => {
            error(e);
          });
      },
    }),
  }));

  return (
    <S.SignUpForm {...state.form.asProps}>
      <S.Title>{t("authModal.registration.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.first_name")}</S.InputLabel>
        <Input {...state.form.fields.name.asProps} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.last_name")}</S.InputLabel>
        <Input {...state.form.fields.surname.asProps} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input {...state.form.fields.email.asProps} light={true} />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput {...state.form.fields.password.asProps} light={true} />
      </S.InputWrapper>
      <S.CheckboxWrapper>
        <Checkbox {...state.form.fields.agree.asProps}>
          {t("common.privacyPolicyAgreed")}
        </Checkbox>
      </S.CheckboxWrapper>

      <FlexBox>
        <FlexBox flexDirection={"column"} alignItems={"center"}>
          <Button {...state.form.asSubmitButtonProps}>
            {t("common.registration")}
          </Button>
          <If condition={isMobile}>
            <S.NavigateButton
              style={{ paddingTop: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                setShowSignUp(false);
              }}
            >
              {t("common.enter")}
            </S.NavigateButton>
          </If>
        </FlexBox>
      </FlexBox>
    </S.SignUpForm>
  );
});

const PasswordRecoveryForm = observer(({ setShowPasswordRecovery }) => {
  const { t } = useTranslation();
  const state = useLocalObservable(() => ({
    email: "",
    loading: false,
    isSent: false,
    error: "",
  }));
  return (
    <S.LoginForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <S.Title>{t("authModal.forgetPassword.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input
          name={"email"}
          error={state.error}
          light={true}
          onChange={(e) => {
            runInAction(() => {
              state.error = "";
              state.email = (e.target as HTMLInputElement).value;
            });
          }}
        />
      </S.InputWrapper>
      <If condition={state.isSent}>
        <S.ForgotPassText
          style={{
            color: "green",
          }}
        >
          {t("authModal.forgetPassword.mailSent")}
        </S.ForgotPassText>
      </If>
      <If condition={!state.isSent}>
        <S.ForgotPassText>
          {t("authModal.forgetPassword.typeEmail")}
        </S.ForgotPassText>
      </If>
      <S.BtnGroup>
        <S.NavigateButton
          onClick={(e) => {
            setShowPasswordRecovery(false);
          }}
        >
          {t("common.back")}
        </S.NavigateButton>
        <Button
          loading={state.loading}
          onClick={() => {
            runInAction(() => {
              state.loading = true;
              state.error = "";
            });
            authApi
              .restorePassword(state.email)
              .then(() => {
                runInAction(() => {
                  state.isSent = true;
                  state.email = "";
                });
              })
              .catch((e) => {
                const { errors } = e.response.data;
                if (errors) {
                  Object.keys(errors).forEach((key) => {
                    if (key === "email") {
                      runInAction(() => {
                        state.error = errors[key][0];
                      });
                    }
                  });
                }
              })
              .finally(() => {
                runInAction(() => {
                  state.loading = false;
                });
              });
          }}
        >
          {t("common.recover")}
        </Button>
      </S.BtnGroup>
    </S.LoginForm>
  );
});

const LoginForm = ({ setShowSignUp, setShowPasswordRecovery }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const city = useCity();
  const spot = useSpot();

  return (
    <S.LoginForm
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <S.Title>{t("authModal.login.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input
          name={"email"}
          error={loginError}
          onChange={(e) => {
            setLogin((e.target as HTMLInputElement).value);
            setLoginError("");
          }}
          light={true}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput
          name={"password"}
          error={passwordError}
          onChange={(e) => {
            setPassword((e.target as HTMLInputElement).value);
            setPasswordError("");
          }}
          light={true}
        />
      </S.InputWrapper>
      <FlexBox justifyContent={"flex-end"}>
        <S.NavigateButton
          style={{ paddingTop: "10px" }}
          onClick={(e) => {
            setShowPasswordRecovery(true);
          }}
        >
          {t("common.forgotPassword")}
        </S.NavigateButton>
      </FlexBox>

      <Button
        loading={loading}
        onClick={() => {
          setLoginError("");
          setPasswordError("");
          setLoading(true);
          AuthApi.login({
            email: login,
            password: password,
          })
            .then((res) => {
              const { token, expires, user } = res.data.data;
              Cookies.set("jwt", token);
              transaction(() => {
                stores.AuthStore.setAuthToken(token);
                stores.AuthStore.userFromJson(user);
                stores.AuthStore.setExpires(expires);
              });
              navigate("/" + city.slug + "/" + spot.slug + "/account/profile");
            })
            .catch((e) => {
              const { errors, message } = e.response.data;
              if (errors) {
                Object.keys(errors).forEach((key) => {
                  if (key === "email") {
                    setLoginError(errors[key][0]);
                  }
                  if (key === "password") {
                    setPasswordError(errors[key][0]);
                  }
                });
              } else {
                setLoginError(message);
              }
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        style={{ marginTop: "20px", display: "flex" }}
      >
        {t("common.login")}
      </Button>

      <If condition={isMobile}>
        <S.NavigateButton
          style={{ paddingTop: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            setShowSignUp(true);
          }}
        >
          {t("common.registration")}
        </S.NavigateButton>
      </If>
    </S.LoginForm>
  );
};
