import * as S from "./styled";
import { useState } from "react";
import { PasswordInput, Input, FlexBox, Modal } from "~components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogin } from "~hooks/use-auth";
import { AxiosError } from "axios";
import { cartQuery, wishlistsQuery } from "~queries";
import NiceModal from "@ebay/nice-modal-react";
import { ROUTES } from "~routes";
import { useModal } from "~modal";
import { ModalIDEnum } from "~common/modal.constants";
import { TextButton } from "~common/ui-components/TextButton";
import { Button } from "~common/ui-components/Button/Button";
import { useQueryClient } from "@tanstack/react-query";

export const AuthModal = NiceModal.create(
  ({ redirect_to }: { redirect_to?: string }) => {
    const modal = useModal();
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const login = useLogin();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{
      email?: string[];
      password?: string[];
    }>({});

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
            <S.Form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: use formik
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email") as string | null;
                const password = formData.get("password") as string | null;
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
                      navigate(redirect_to || ROUTES.ACCOUNT.PROFILE.path);
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
              <Input
                label={t("common.email")}
                name={"email"}
                error={errors?.email?.[0]}
                light={true}
              />

              <PasswordInput
                style={{
                  marginTop: 20,
                }}
                label={t("common.password")}
                name={"password"}
                error={errors?.password?.[0]}
                light={true}
              />

              <FlexBox justifyContent={"flex-end"}>
                <TextButton
                  style={{ paddingTop: "10px" }}
                  onClick={(e) => {
                    NiceModal.hide(ModalIDEnum.AuthModal);
                    NiceModal.show(ModalIDEnum.ResetPasswordModal);
                  }}
                >
                  {t("common.forgotPassword")}
                </TextButton>
              </FlexBox>

              <Button
                loading={login.isLoading}
                type="submit"
                style={{ marginTop: "20px", display: "flex" }}
              >
                {t("common.login")}
              </Button>

              <TextButton
                style={{ paddingTop: "10px" }}
                onClick={(e) => {
                  e.preventDefault();
                  NiceModal.show(ModalIDEnum.RegisterModal);
                  NiceModal.hide(ModalIDEnum.AuthModal);
                }}
              >
                {t("common.registration")}
              </TextButton>
            </S.Form>
          </S.Wrapper>
        )}
      </Modal>
    );
  }
);
