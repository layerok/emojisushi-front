import { Container, Heading, If } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useAppStore } from "~stores/appStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

export const DeliveryPage = observer(() => {
  const { t } = useTranslation();
  const appStore = useAppStore();

  return (
    <Container>
      <S.FlexContainer>
        <S.Left>
          <S.HeadingWrapper>
            <Heading
              style={{
                fontWeight: "600",
              }}
            >
              {t("delivery-and-payment.title")}
            </Heading>
          </S.HeadingWrapper>

          <S.AdresText>
            <b>{t("common.address")}</b>: {appStore.spot.address}
          </S.AdresText>

          <S.DeliveryText
            dangerouslySetInnerHTML={{ __html: appStore.spot.html_content }}
          />
          <Link
            style={{
              color: "white",
            }}
            to={"/refund"}
          >
            {t("payment.refund-rules")}
          </Link>
        </S.Left>

        <If condition={!!appStore.spot.google_map_url}>
          <S.Right>
            <iframe
              src={appStore.spot.google_map_url}
              width="100%"
              height="480"
            />
          </S.Right>
        </If>
      </S.FlexContainer>
    </Container>
  );
});

export const Component = DeliveryPage;

Object.assign({
  displayName: "LazyDeliveryPage",
});
