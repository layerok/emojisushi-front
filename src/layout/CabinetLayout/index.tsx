import * as S from "./styled";
import { ButtonDark, NavLink, Container } from "~components";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import {
  Outlet,
  useMatches,
  useNavigate,
  useParams,
  useRevalidator,
} from "react-router-dom";

const CabinetLayout = () => {
  const { t } = useTranslation();
  const { lang, spotSlug, citySlug } = useParams();
  const navigate = useNavigate();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const revalidator = useRevalidator();

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
                      Cookies.remove("jwt");
                      // I don't know why loaders don't run on navigation automatically
                      // I'll fix it later, for now I will revalidate manually
                      revalidator.revalidate();
                      navigate("/" + [lang, citySlug, spotSlug].join("/"));
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
          <Outlet />
        </S.RightSide>
      </S.Wrapper>
    </Container>
  );
};

export const Component = CabinetLayout;

Object.assign(Component, {
  displayName: "LazyCabinetLayout",
});
