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

          <S.DeliveryText>
            {appStore.spot.slug === "chornomorsk-mira" && (
              <>
                <h3>Умови доставки:</h3>
                <ol>
                  <li>Місто - від 400₴ безкоштовно, інакше 50₴&nbsp;</li>
                  <li>Олександрівка - від 550₴ безкоштовно, інакше 50₴</li>
                  <li>Молодіжне - від 500₴ безкоштовно, інашке 50₴</li>
                  <li>
                    Великодолинське - від 800₴ &nbsp;безкоштовно, інакше 100₴
                  </li>
                  <li>
                    Малодолинське - від 600₴ безкоштовно, інакше 100₴&nbsp;
                  </li>
                  <li>Ветеран , Волна - від 500грн безкоштовно, інашке 50₴</li>
                  <li>
                    Бурлача балка - від 1000грн безкоштовно, інакше таксі за
                    рахунок клієнта
                  </li>
                </ol>
              </>
            )}
          </S.DeliveryText>
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
