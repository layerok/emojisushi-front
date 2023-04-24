import * as S from "./styled";
import { ButtonDark, NavLink } from "~components";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";

export const CabinetLayout = ({ children, title = "" }) => {
  const { t } = useTranslation();
  const { lang, spotSlug, citySlug } = useParams();
  const navigate = useNavigate();

  return (
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
                  lang +
                  "/" +
                  citySlug +
                  "/" +
                  spotSlug +
                  "/account/profile"
                }
              >
                {t("account.profile.title")}
              </NavLink>
              <NavLink
                to={
                  "/" +
                  lang +
                  "/" +
                  citySlug +
                  "/" +
                  spotSlug +
                  "/account/orders"
                }
              >
                {t("account.orders.title")}
              </NavLink>
              <NavLink
                to={
                  "/" +
                  lang +
                  "/" +
                  citySlug +
                  "/" +
                  spotSlug +
                  "/account/recover-password"
                }
              >
                {t("account.changePassword.title")}
              </NavLink>
              <NavLink
                to={
                  "/" +
                  lang +
                  "/" +
                  citySlug +
                  "/" +
                  spotSlug +
                  "/account/saved-addresses"
                }
              >
                {t("account.addresses.title")}
              </NavLink>
              <div style={{ marginTop: "10px" }}>
                <ButtonDark
                  onClick={() => {
                    Cookies.remove("jwt");
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
        <S.Heading>{title}</S.Heading>
        <S.Content>{children}</S.Content>
      </S.RightSide>
    </S.Wrapper>
  );
};
