import { Heading, CheckCircleSvg, SvgIcon, Container } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "styled-components";

// todo: don't prompt the user to choose a city
export const ThankYouPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  return (
    <Container>
      <S.Center>
        <Heading
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {t("thankYou.subtitle", { id: searchParams.get("order_id") })}
        </Heading>
        <SvgIcon color={theme.colors.brand} style={{ width: "60px" }}>
          <CheckCircleSvg />
        </SvgIcon>
        <S.Text>{t("thankYou.text")}</S.Text>
      </S.Center>
    </Container>
  );
};

export const Component = ThankYouPage;

Object.assign(Component, {
  displayName: "LazyThankYouPage",
});
