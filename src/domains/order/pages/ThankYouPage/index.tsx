import { Heading, CheckCircleSvg, SvgIcon, Container } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

// todo: don't prompt the user to choose a city
export const ThankYouPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const order_id = searchParams.get("order_id");
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
          {!!order_id
            ? t("thankYou.subtitle", {
                id: searchParams.get("order_id"),
              })
            : t("thankYou.subtitleWithoutId")}
        </Heading>
        <SvgIcon color={"#FFE600"} style={{ width: "60px" }}>
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
