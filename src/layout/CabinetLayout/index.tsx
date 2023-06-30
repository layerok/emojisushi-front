import * as S from "./styled";
import { ButtonDark, NavLink, Container } from "~components";
import { useTranslation } from "react-i18next";
import { Outlet, useMatches, useParams, useSubmit } from "react-router-dom";
import { AuthLoader, useLogout } from "~hooks/use-auth";

const CabinetLayout = () => {
  const { t } = useTranslation();
  const { lang, spotSlug, citySlug } = useParams();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const submit = useSubmit();
  const logout = useLogout();

  return (
    <Container>
      <S.Wrapper>
        <S.LeftSide>
          <S.Cabinet>
            <S.Container>
              <S.Navbar>
                <S.NavbarHeader>{t("account.cabinet")}</S.NavbarHeader>
                <S.HorizontalBar />
                <NavLink
                  to={
                    "/" +
                    [lang, citySlug, spotSlug, "account", "profile"].join("/")
                  }
                >
                  {t("account.profile.title")}
                </NavLink>
                <NavLink
                  to={
                    "/" +
                    [lang, citySlug, spotSlug, "account", "orders"].join("/")
                  }
                >
                  {t("account.orders.title")}
                </NavLink>
                <NavLink
                  to={
                    "/" +
                    [
                      lang,
                      citySlug,
                      spotSlug,
                      "account",
                      "recover-password",
                    ].join("/")
                  }
                >
                  {t("account.changePassword.title")}
                </NavLink>
                <NavLink
                  to={
                    "/" +
                    [
                      lang,
                      citySlug,
                      spotSlug,
                      "account",
                      "saved-addresses",
                    ].join("/")
                  }
                >
                  {t("account.addresses.title")}
                </NavLink>
                <div style={{ marginTop: "10px" }}>
                  <ButtonDark
                    onClick={() => {
                      const formData = new FormData();
                      formData.append("type", "logout");

                      submit(formData, {
                        method: "post",
                        action: "/" + [lang, citySlug, spotSlug].join("/"),
                      });
                      logout.mutate({});
                    }}
                    minWidth={"201px"}
                  >
                    {t("common.logout")}
                  </ButtonDark>
                </div>
              </S.Navbar>
            </S.Container>
          </S.Cabinet>
        </S.LeftSide>

        <S.RightSide>
          <S.Heading>{(match.handle as any)?.title()}</S.Heading>
          <AuthLoader
            renderLoading={() => <div>...loading user</div>}
            renderUnauthenticated={() => {
              return <div>not logged in</div>;
            }}
          >
            <Outlet />
          </AuthLoader>
        </S.RightSide>
      </S.Wrapper>
    </Container>
  );
};

export const Component = CabinetLayout;

Object.assign(Component, {
  displayName: "LazyCabinetLayout",
});
