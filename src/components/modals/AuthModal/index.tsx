import * as S from "./styled";
import { cloneElement, useState } from "react";
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
import { useFetcher, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AuthModal = ({ children, redirect_to }) => {
  // todo: don't use it
  const { isMobile } = useBreakpoint2();

  const [showPasswordRecovery, setShowPasswordRecovery] = useState();
  const [showSignUp, setShowSignUp] = useState(false);
  const showLoginForm = isMobile
    ? !showPasswordRecovery && !showSignUp
    : !showPasswordRecovery;
  const showSignUpForm = !isMobile || showSignUp;

  return (
    <Modal
      width={"auto"}
      render={({ close }) => (
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
            <SignUpForm setShowSignUp={setShowSignUp} />
          </If>
        </S.Wrapper>
      )}
    >
      {cloneElement(children)}
    </Modal>
  );
};

const SignUpForm = ({ setShowSignUp }) => {
  const { t } = useTranslation();
  const { lang, spotSlug, citySlug } = useParams();
  const fetcher = useFetcher<
    | {
        errors: Record<string, string[]>;
      }
    | undefined
  >();

  const [checked, setChecked] = useState(false);

  const actionData = fetcher.data;

  return (
    <S.SignUpForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("type", "register");

        fetcher.submit(formData, {
          method: "post",
          action: "/" + [lang, citySlug, spotSlug].join("/"),
        });
      }}
    >
      <S.Title>{t("authModal.registration.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.first_name")}</S.InputLabel>
        <Input name="name" error={actionData?.errors?.name?.[0]} light={true} />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.last_name")}</S.InputLabel>
        <Input
          name="surname"
          error={actionData?.errors?.surname?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input
          name="email"
          error={actionData?.errors?.email?.[0]}
          light={true}
        />
      </S.InputWrapper>

      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput
          name="password"
          error={actionData?.errors?.password?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <S.CheckboxWrapper>
        <Checkbox
          checked={checked}
          error={actionData?.errors?.agree?.[0]}
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
          <Button submitting={fetcher.state === "submitting"}>
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
};

const PasswordRecoveryForm = observer(({ setShowPasswordRecovery }) => {
  const { t } = useTranslation();

  const { lang, citySlug, spotSlug } = useParams();
  const fetcher = useFetcher<
    | {
        errors?: Record<string, string[]>;
        isSent?: boolean;
      }
    | undefined
  >();
  return (
    <S.LoginForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("type", "reset-password");
        fetcher.submit(formData, {
          method: "post",
          action: "/" + [lang, citySlug, spotSlug].join("/"),
        });
      }}
    >
      <S.Title>{t("authModal.forgetPassword.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input
          name={"email"}
          error={fetcher.data?.errors?.email?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <If condition={fetcher.data?.isSent}>
        <S.ForgotPassText
          style={{
            color: "green",
          }}
        >
          {t("authModal.forgetPassword.mailSent")}
        </S.ForgotPassText>
      </If>
      <If condition={!fetcher.data?.isSent}>
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
        <Button submitting={fetcher.state === "submitting"} type="submit">
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

  const { lang, spotSlug, citySlug } = useParams();
  const fetcher = useFetcher<
    | {
        errors: Record<string, string[]>;
      }
    | undefined
  >();

  return (
    <S.LoginForm
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("type", "login");
        if (redirect_to) {
          formData.append("redirect_to", redirect_to);
        }

        fetcher.submit(formData, {
          method: "post",
          action: "/" + [lang, citySlug, spotSlug].join("/"),
        });
      }}
    >
      <S.Title>{t("authModal.login.title")}</S.Title>
      <S.InputWrapper>
        <S.InputLabel>{t("common.email")}</S.InputLabel>
        <Input
          name={"email"}
          error={fetcher?.data?.errors?.email?.[0]}
          light={true}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <S.InputLabel>{t("common.password")}</S.InputLabel>
        <PasswordInput
          name={"password"}
          error={fetcher?.data?.errors?.password?.[0]}
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
        submitting={fetcher.state === "submitting"}
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
