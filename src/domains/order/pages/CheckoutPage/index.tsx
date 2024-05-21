import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Container, Heading } from "~components";
import { cartQuery, paymentQuery, shippingQuery } from "~queries";
import { ROUTES } from "~routes";
import { Page } from "~components/Page";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

import { spotsQuery } from "~domains/spot/queries/spots.query";
import { CheckoutForm } from "~domains/order/pages/CheckoutPage/components/CheckoutForm";
import { CheckoutCart } from "~domains/order/pages/CheckoutPage/components/CheckoutCart";
import * as S from "./styled";

// todo: scroll the page up when users visits the checkout page

const CheckoutPage = () => {
  const { t } = useTranslation();

  const { data: user, isLoading: isUserLoading } = useUser();

  const { data: cart, isLoading: isCartLoading } = useQuery({
    ...cartQuery,
    onSuccess: (res) => {
      if (res.data.length < 1) {
        navigate(ROUTES.CATEGORY.path);
      }
    },
  });

  const { data: spots, isLoading: isSpotsLoading } = useQuery({
    ...spotsQuery(),
  });

  const { data: shippingMethods, isLoading: isShippingMethodsLoading } =
    useQuery(shippingQuery);
  const { data: paymentMethods, isLoading: isPaymentMethodsLoading } =
    useQuery(paymentQuery);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart?.data && cart.data.length < 1) {
      navigate(ROUTES.CATEGORY.path);
    }
  }, [cart]);

  return (
    <Page>
      <Container>
        <Heading>{t("checkout.title")}</Heading>
        <S.Container>
          {isCartLoading ||
          isUserLoading ||
          isShippingMethodsLoading ||
          isSpotsLoading ||
          isPaymentMethodsLoading ? (
            <CheckoutForm loading />
          ) : (
            <CheckoutForm
              // remount component after signin to update form
              key={user ? "one" : "second"}
              cart={cart}
              shippingMethods={shippingMethods}
              paymentMethods={paymentMethods}
              user={user}
              spots={spots}
            />
          )}

          {isCartLoading ? (
            <CheckoutCart loading={true} />
          ) : (
            <CheckoutCart cart={cart} />
          )}
        </S.Container>
      </Container>
    </Page>
  );
};

export const Component = CheckoutPage;

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign(Component, {
  displayName: "LazyCheckoutPage",
});
