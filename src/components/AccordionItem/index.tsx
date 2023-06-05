import * as S from "./styled";
import { SvgIcon } from "../SvgIcon";
import { FlexBox } from "../FlexBox";
import { CaretUpSvg } from "../svg/CaretUpSvg";
import { Collapsible } from "../Collapsible";
import { IOrder } from "~api/types";
import { LogoSvg } from "~components/svg/LogoSvg";
import { useTranslation } from "react-i18next";

export const AccordionItem = ({ order }: { order: IOrder }) => {
  const { t } = useTranslation();

  const renderContainer = ({ Header, Panel }) => {
    return (
      <S.Container>
        <Header />
        <Panel />
      </S.Container>
    );
  };
  const renderHeader = ({ opened }) => {
    return (
      <S.Header>
        <S.Header.MobileTextContainer>
          <S.MutedText>№{order.order_number}</S.MutedText>
          <S.Pan.Props.Prop.Value>{order.updated_at}</S.Pan.Props.Prop.Value>
        </S.Header.MobileTextContainer>
        <S.Header.Status
          style={{
            color: order.order_state.color,
          }}
        >
          {order.order_state.name}
        </S.Header.Status>
        <SvgIcon
          width={"20px"}
          style={{
            transformOrigin: "center",
            transform: opened ? "rotate(0deg)" : "rotate(180deg)",
          }}
          color={"#939393"}
        >
          <CaretUpSvg />
        </SvgIcon>
      </S.Header>
    );
  };
  const renderPanel = ({ opened }) => {
    return (
      <S.Pan>
        <S.Pan.Props>
          <S.Pan.Props.ExceptStatus>
            <S.Pan.Props.Prop>
              <S.Pan.Props.Prop.Label>
                <S.MutedText>{t("common.paymentMethod")}</S.MutedText>
              </S.Pan.Props.Prop.Label>
              <S.Pan.Props.Prop.Value>
                {order.payment.method.name}
              </S.Pan.Props.Prop.Value>
            </S.Pan.Props.Prop>
            <S.Pan.Props.Prop>
              <S.Pan.Props.Prop.Label>
                <S.MutedText>{t("common.shippingMethod")}</S.MutedText>
              </S.Pan.Props.Prop.Label>
              <S.Pan.Props.Prop.Value>
                {order.shipping.method.name}
              </S.Pan.Props.Prop.Value>
            </S.Pan.Props.Prop>
            <S.Pan.Props.Prop>
              <S.Pan.Props.Prop.Label>
                <S.MutedText>{t("common.shippingAddress")}</S.MutedText>
              </S.Pan.Props.Prop.Label>
              <S.Pan.Props.Prop.Value>
                {order.billing_address.lines}
              </S.Pan.Props.Prop.Value>
            </S.Pan.Props.Prop>
          </S.Pan.Props.ExceptStatus>
          <S.Pan.Status>
            <S.Pan.Status.Label>
              {t("account.orders.order.status")}
            </S.Pan.Status.Label>
            <S.Pan.Status.Value
              style={{
                color: order.order_state.color,
              }}
            >
              {order.order_state.name}
            </S.Pan.Status.Value>
          </S.Pan.Status>
        </S.Pan.Props>

        <div>
          {order.products.map((product, index) => {
            const mainImage =
              product.product &&
              product.product.image_sets.length > 0 &&
              product.product.image_sets[0] &&
              product.product.image_sets[0].images?.length > 0
                ? product.product.image_sets[0].images[0].path
                : undefined;

            return (
              <S.Pan.Prod key={product.id}>
                {mainImage ? (
                  <S.Pan.Prod.Img src={mainImage} />
                ) : (
                  <SvgIcon
                    color={"white"}
                    width={"80px"}
                    style={{ opacity: 0.05 }}
                  >
                    <LogoSvg />
                  </SvgIcon>
                )}

                <S.Pan.Prod.Props>
                  <S.Pan.Prod.Sect1>
                    <S.Pan.Prod.Name>{product.name}</S.Pan.Prod.Name>

                    <S.Pan.Prod.Description>
                      <S.Pan.Prod.Prop>
                        {product.quantity} {t("common.pcs")}
                      </S.Pan.Prod.Prop>
                      <S.Pan.VerticalStick />
                      <S.Pan.Prod.Prop>{product.weight} г</S.Pan.Prod.Prop>
                    </S.Pan.Prod.Description>
                  </S.Pan.Prod.Sect1>

                  <S.Pan.Prod.Sect2>
                    <FlexBox flexDirection={"column"}>
                      <S.Pan.Prod.Price>
                        {product.item.price[order.currency.code]}
                      </S.Pan.Prod.Price>
                      <S.Pan.Prod.Amount>
                        {t("common.amount")}: {product.quantity}{" "}
                        {t("common.pcs")}
                      </S.Pan.Prod.Amount>
                    </FlexBox>
                    <div style={{ marginLeft: "39px" }}>
                      <S.Pan.Prod.Price>
                        {product.item.price[order.currency.code]}
                      </S.Pan.Prod.Price>
                    </div>
                  </S.Pan.Prod.Sect2>
                </S.Pan.Prod.Props>
              </S.Pan.Prod>
            );
          })}
        </div>

        <S.Pan.Prod.TotalPrice>
          <S.Pan.Prod.Price>
            {t("common.to_pay")}: {order.total_post_taxes / 100}{" "}
            {order.currency.symbol}
          </S.Pan.Prod.Price>
        </S.Pan.Prod.TotalPrice>
      </S.Pan>
    );
  };

  return (
    <Collapsible
      renderPanel={({ opened }) => {
        return renderPanel({ opened });
      }}
      renderHeader={({ opened }) => {
        return renderHeader({ opened });
      }}
      renderContainer={({ Header, Panel }) => {
        return renderContainer({ Header, Panel });
      }}
      headerTag={"div"}
    />
  );
};
