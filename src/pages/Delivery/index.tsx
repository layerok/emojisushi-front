import { Heading } from "~components/Heading";
import * as S from "./styled";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { If } from "~components/If";
import { useSpot } from "~hooks/use-spot";

export const Delivery = observer(() => {
  const { t } = useTranslation();
  const spot = useSpot();

  return (
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
  );
});

export const Component = Delivery;

Object.assign({
  displayName: "LazyDelivery",
});
