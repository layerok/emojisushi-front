import { Heading, CheckCircleSvg, SvgIcon } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";

export const ThankYouPage = () => {
  const { t } = useTranslation();
  return (
    <S.Center>
      <Heading
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        {t("thankYou.title")}
      </Heading>
      <SvgIcon color={"#FFE600"} style={{ width: "60px" }}>
        <CheckCircleSvg />
      </SvgIcon>
      <S.MediumText>{t("thankYou.subtitle")}</S.MediumText>
      <S.Text>{t("thankYou.text")}</S.Text>
    </S.Center>
  );
};

export const Component = ThankYouPage;

Object.assign(Component, {
  displayName: "LazyThankYouPage",
});
