import { Container, Heading } from "~components";
import { CheckoutForm, CheckoutCart } from "./components";
import {
  Await,
  Navigate,
  defer,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { queryClient } from "~query-client";
import { paymentQuery, shippingQuery } from "~queries";
import { Suspense } from "react";
import { AwaitAll } from "~components/AwaitAll";
import { LayoutRouteLoaderData } from "~layout/Layout";
import * as S from "./styled";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { user, cart } = useRouteLoaderData("layout") as LayoutRouteLoaderData;
  const { shippingMethods, paymentMethods } = useLoaderData() as any;
  const { lang, citySlug, spotSlug } = useParams();

  return (
    <Container>
      <Suspense>
        <Await resolve={cart}>
          {(cart) => {
            if (cart.data.length < 1) {
              return (
                <Navigate to={"/" + [lang, citySlug, spotSlug].join("/")} />
              );
            } else {
              return null;
            }
          }}
        </Await>
      </Suspense>

      <Heading>{t("checkout.title")}</Heading>
      <S.Container>
        <Suspense fallback={<CheckoutForm loading />}>
          <AwaitAll
            cart={cart}
            shippingMethods={shippingMethods}
            paymentMethods={paymentMethods}
            user={user}
          >
            {({ cart, shippingMethods, paymentMethods, user }) => (
              <CheckoutForm
                cart={cart}
                shippingMethods={shippingMethods}
                paymentMethods={paymentMethods}
                user={user}
              />
            )}
          </AwaitAll>
        </Suspense>
        <Suspense fallback={<CheckoutCart loading={true} />}>
          <Await resolve={cart}>{(cart) => <CheckoutCart cart={cart} />}</Await>
        </Suspense>
      </S.Container>
    </Container>
  );
};

export const Component = CheckoutPage;

Object.assign(Component, {
  displayName: "LazyCheckoutPage",
});

export const loader = () => {
  return defer({
    paymentMethods:
      queryClient.getQueryData(paymentQuery.queryKey) ??
      queryClient.fetchQuery(paymentQuery),
    shippingMethods:
      queryClient.getQueryData(shippingQuery.queryKey) ??
      queryClient.fetchQuery(shippingQuery),
  });
};
