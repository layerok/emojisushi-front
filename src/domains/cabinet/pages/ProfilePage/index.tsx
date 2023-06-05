import * as S from "./styled";
import { ButtonDark } from "src/components";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { requireUser } from "~utils/loader.utils";

export const ProfilePage = () => {
  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <S.Properties>
      <S.Property>
        <S.Property.Label>{t("common.first_name")}</S.Property.Label>
        <S.Property.Value>
          {user.name} {user.surname}
        </S.Property.Value>
      </S.Property>

      <S.Property>
        <S.Property.Label>{t("common.email")}</S.Property.Label>
        <S.Property.Value>{user.email}</S.Property.Value>
      </S.Property>
      <S.Property>
        <S.Property.Label>{t("common.phone")}</S.Property.Label>
        <S.Property.Value>{user.phone}</S.Property.Value>
      </S.Property>

      <S.BtnGroup>
        <ButtonDark
          onClick={() => {
            navigate("edit");
          }}
          minWidth={"309px"}
        >
          {t("account.profile.editProfile")}
        </ButtonDark>
        <S.BtnWrapper>
          <ButtonDark
            onClick={() => {
              navigate("../recover-password");
            }}
            minWidth={"202px"}
          >
            {t("account.profile.changePassword")}
          </ButtonDark>
        </S.BtnWrapper>
      </S.BtnGroup>
    </S.Properties>
  );
};

export const Component = ProfilePage;
Object.assign(Component, {
  displayName: "LazyProfilePage",
});

export const loader = async () => {
  const user = await requireUser();

  return {
    user,
  };
};
