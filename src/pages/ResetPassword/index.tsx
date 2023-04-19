import { Layout } from "~layout/Layout";
import { useState } from "react";
import * as S from "./styled";
import { FlexBox, Button, Input, PasswordInput } from "~components";
import { useParams } from "react-router-dom";
import { authApi } from "~api";
import { useTranslation } from "react-i18next";

export const ResetPassword = () => {
  const { t } = useTranslation();
  const { code: codeFromQuery } = useParams();
  const [code, setCode] = useState(codeFromQuery);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [isReset, setIsReset] = useState(false);

  return (
    <Layout>
      <FlexBox justifyContent={"center"}>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2>{t("passwordReset.title")}</h2>

          <Input
            error={codeError}
            value={code}
            onChange={(e) => {
              setCode((e.target as HTMLInputElement).value);
              setCodeError("");
            }}
            style={{
              marginTop: "16px",
            }}
            name={"code"}
            placeholder={t("common.code")}
          />

          <PasswordInput
            error={passwordError}
            onChange={(e) => {
              setPassword((e.target as HTMLInputElement).value);
              setPasswordError("");
            }}
            style={{
              marginTop: "16px",
            }}
            name={"password"}
            placeholder={t("common.newPassword")}
          />

          {isReset && (
            <p
              style={{
                color: "green",
                marginTop: "12px",
              }}
            >
              Пароль успішно скинутий!
            </p>
          )}

          <Button
            loading={loading}
            onClick={() => {
              setLoading(true);
              authApi
                .resetPassword({
                  code,
                  password,
                })
                .then((res) => {
                  setIsReset(true);
                })
                .catch((e) => {
                  const { errors } = e.response.data;
                  if (errors) {
                    Object.keys(errors).forEach((key) => {
                      if (key === "password") {
                        setPasswordError(errors[key][0]);
                      }
                      if (key === "code") {
                        setCodeError(errors[key][0]);
                      }
                    });
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
            style={{
              marginTop: "16px",
            }}
          >
            {t("common.reset")}
          </Button>
        </S.Form>
      </FlexBox>
    </Layout>
  );
};

export const Component = ResetPassword;
Object.assign(Component, {
  displayName: "LazyResetPassword",
});
