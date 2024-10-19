import * as S from "./styled";
import { useState } from "react";
import {
  PasswordInput,
  Checkbox,
  Input,
  FlexBox,
  Modal,
  SvgIcon,
} from "~components";
import { Button } from "~common/ui-components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRegister } from "~hooks/use-auth";
import { AxiosError } from "axios";
import { cartQuery } from "~domains/cart/cart.query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import NiceModal from "@ebay/nice-modal-react";
import { ROUTES } from "~routes";
import { useModal } from "~modal";
import { ModalIDEnum } from "~common/modal.constants";
import { TextButton } from "~common/ui-components/TextButton";
import { useQueryClient } from "@tanstack/react-query";
import styled, { useTheme } from "styled-components";
import { Times } from "~assets/ui-icons";
import { media } from "~common/custom-media";

export const RegisterModal = NiceModal.create(
  ({ redirect_to }: { redirect_to?: string }) => {
    const queryClient = useQueryClient();
    const theme = useTheme();
    const modal = useModal();
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

    const createSubmitHandler =
      ({ close }: { close: () => void }) =>
      (e) => {
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
              navigate(ROUTES.ACCOUNT.PROFILE.path);
              close();
            },
            onError: (error) => {
              if (error instanceof AxiosError) {
                setErrors(error.response.data.errors);
              }
            },
          }
        );
      };

    const openSignIn = (e) => {
      e.preventDefault();
      NiceModal.show(ModalIDEnum.AuthModal);
      NiceModal.hide(ModalIDEnum.RegisterModal);
    };

    return (
      <Modal
        overlayStyles={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: theme.zIndices.modals,
        }}
        open={modal.visible}
        onClose={() => {
          modal.remove();
        }}
      >
        {({ close, labelId, descriptionId }) => (
          <Container>
            <CloseIcon>
              <SvgIcon
                onClick={close}
                hoverColor={theme.colors.brand}
                color={"white"}
                style={{
                  cursor: "pointer",
                  width: 35,
                }}
              >
                <Times />
              </SvgIcon>
            </CloseIcon>
            <S.Wrapper>
              <S.Form onSubmit={createSubmitHandler({ close })}>
                <S.Title>{t("authModal.registration.title")}</S.Title>
                <Input
                  label={t("common.first_name")}
                  name="name"
                  error={errors?.name?.[0]}
                  light={true}
                />

                <Input
                  label={t("common.last_name")}
                  style={{
                    marginTop: 20,
                  }}
                  name="surname"
                  error={errors?.surname?.[0]}
                  light={true}
                />

                <Input
                  label={t("common.email")}
                  style={{
                    marginTop: 20,
                  }}
                  name="email"
                  error={errors?.email?.[0]}
                  light={true}
                />

                <PasswordInput
                  label={t("common.password")}
                  style={{
                    marginTop: 20,
                  }}
                  name="password"
                  error={errors?.password?.[0]}
                  light={true}
                />

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
                    <Button loading={register.isLoading}>
                      {t("common.registration")}
                    </Button>

                    <TextButton
                      style={{ paddingTop: "10px" }}
                      onClick={openSignIn}
                    >
                      {t("common.enter")}
                    </TextButton>
                  </FlexBox>
                </FlexBox>
              </S.Form>
            </S.Wrapper>
          </Container>
        )}
      </Modal>
    );
  }
);

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.canvas.inset2};
  box-shadow: ${({ theme }) => theme.shadows.canvasInset2Shadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: -35px;
  cursor: pointer;

  ${media.lessThan("pc")`
    right: 10px;
    top: 10px;
  `}
`;
