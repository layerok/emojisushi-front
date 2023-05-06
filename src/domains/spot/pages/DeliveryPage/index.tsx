import { Container, Heading, If } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { useRouteLoaderData } from "react-router-dom";
import { ICity, ISpot } from "~api/types";
import { City, Spot } from "~models";

type DeliverPageLoaderData = {
  spot: ISpot;
  city: ICity;
};

export const DeliveryPage = () => {
  const { t } = useTranslation();
  const { spot: spotJson, city: cityJson } = useRouteLoaderData(
    "layout"
  ) as DeliverPageLoaderData;

  const city = new City(cityJson);
  const spot = new Spot(spotJson, city);

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
              Доставка и оплата
            </Heading>
          </S.HeadingWrapper>

          <S.AdresText>
            <b>{t("common.address")}</b>: {spot.address}
          </S.AdresText>

          <S.DeliveryText dangerouslySetInnerHTML={{ __html: spot.content }} />
        </S.Left>

        <If condition={!!spot.googleMapUrl}>
          <S.Right>
            <iframe src={spot.googleMapUrl} width="100%" height="480" />
          </S.Right>
        </If>
      </S.FlexContainer>
    </Container>
  );
};

export const Component = DeliveryPage;

Object.assign({
  displayName: "LazyDeliveryPage",
});
