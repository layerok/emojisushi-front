import { Container, Heading, If } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { spotQuery } from "~domains/spot/queries/spot.query";
import { useAppStore } from "~stores/appStore";
import { observer } from "mobx-react";

export const DeliveryPage = observer(() => {
  const { t } = useTranslation();
  const appStore = useAppStore();
  const { data: spot } = useQuery(spotQuery(appStore.spot.slug));

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
            <b>{t("common.address")}</b>: {spot.address}
          </S.AdresText>

          <S.DeliveryText
            dangerouslySetInnerHTML={{ __html: spot.html_content }}
          />
        </S.Left>

        <If condition={!!spot.google_map_url}>
          <S.Right>
            <iframe src={spot.google_map_url} width="100%" height="480" />
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
