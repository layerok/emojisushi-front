import * as S from "./styled";
import { useState } from "react";
import { Button, Input, Modal } from "~components";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { authApi } from "~api";
import { useMutation } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import { useModal } from "~modal";
import { ModalIDEnum } from "~common/modal.constants";
import { TextButton } from "~common/ui/TextButton";

export const ResetPasswordModal = NiceModal.create(
  ({ redirect_to }: { redirect_to?: string }) => {
    const modal = useModal();
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
              <Input
                label={t("common.email")}
                name={"email"}
                error={errors?.email?.[0]}
                light={true}
              />
              {isSent && (
                <S.ForgotPassText
                  style={{
                    color: "green",
                  }}
                >
                  {t("authModal.forgetPassword.mailSent")}
                </S.ForgotPassText>
              )}
              {!isSent && (
                <S.ForgotPassText>
                  {t("authModal.forgetPassword.typeEmail")}
                </S.ForgotPassText>
              )}
              <S.BtnGroup>
                <TextButton
                  onClick={(e) => {
                    NiceModal.show(ModalIDEnum.AuthModal);
                    NiceModal.hide(ModalIDEnum.ResetPasswordModal);
                  }}
                >
                  {t("common.back")}
                </TextButton>
                <Button submitting={resetPassword.isLoading} type="submit">
                  {t("common.recover")}
                </Button>
              </S.BtnGroup>
            </S.Form>
          </S.Wrapper>
        )}
      </Modal>
    );
  }
);
