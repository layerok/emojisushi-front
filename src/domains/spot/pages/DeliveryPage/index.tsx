import { Container, Heading } from "~components";
import * as S from "./styled";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { Page } from "~components/Page";
import { useCurrentCitySlug } from "~domains/city/hooks/useCurrentCitySlug";
import { useQuery } from "@tanstack/react-query";
import { citiesQuery } from "~domains/city/cities.query";

export const DeliveryPage = observer(() => {
  const { t } = useTranslation();

  const citySlug = useCurrentCitySlug();
  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const city = (cities?.data || []).find((c) => c.slug === citySlug);

  return (
    <Page>
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

            {/*<S.AdresText>*/}
            {/*  <b>{t("common.address")}</b>: {city.address}*/}
            {/*</S.AdresText>*/}

            <S.DeliveryText
              dangerouslySetInnerHTML={{ __html: city?.html_content }}
            />
            <p>
              <strong>
                <span
                  style={{
                    fontSize: 18,
                  }}
                >
                  <strong>Правила повернення коштів</strong>
                </span>
              </strong>
            </p>
            <p>
              <br />
            </p>
            <p>
              <strong>
                <span
                  style={{
                    fontSize: 14,
                  }}
                >
                  Повернення коштів або обмін товару відбувається у таких
                  випадках як:
                </span>
              </strong>
            </p>
            <ol>
              <li>
                Товар неналежної якості, а саме: є ознаки зіпсованої продукції
              </li>
              <li>
                Якщо страва важить менше зазначеної ваги більш ніж на 5% (заміна
                товару)
              </li>
              <li>&nbsp;Замовлення прийнято та оплачено, але не виконано.</li>
            </ol>
            <p>
              <br />
            </p>
            <p>
              <strong>Для повернення або заміни необхідно надати:</strong>
            </p>
            <ol>
              <li>Товар чи частина товару</li>
              <li>Товарний чек</li>
              <li>
                Номер телефону та адреси (якщо це була доставка) якщо немає чека
              </li>
              <li>
                У разі якщо вага не відповідає зазначеній клієнт повинен
                зателефонувати на гарячу лінію та повідомити про дану ситуацію,
                зберегти продукцію в повному обсязі (якщо не в повному обсязі -
                продукція не підлягає заміні чи поверненню)
              </li>
            </ol>
            <p>
              <br />
            </p>
            <p>
              <strong>Як і коли повернути чи замінити товар</strong>
            </p>
            <ol>
              <li>Наш кур'єр приїжджає та забирає замовлення.</li>
              <li>Самостійно приносите замовлення до нашого закладу</li>
              <li>
                Після того, як забрали продукцію, ми перевіряємо на наявність
                порушень
              </li>
              <li>
                При виявленні порушень, у той же день або в інший зручний день
                та час виконуємо заміну
              </li>
            </ol>
            <p>
              <br />
            </p>
            <p>
              <strong>Повернення коштів</strong>
            </p>
            <ol>
              <li>Протягом 1-5 робочих днів повертаємо кошти на ваш рахунок</li>
            </ol>
          </S.Left>
          {!!city?.google_map_url && (
            <S.Right>
              <iframe src={city.google_map_url} width="100%" height="480" />
            </S.Right>
          )}
        </S.FlexContainer>
      </Container>
    </Page>
  );
});

export const Component = DeliveryPage;

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign({
  displayName: "LazyDeliveryPage",
});
