import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Container, Heading } from "~components";
import { cartQuery } from "~domains/cart/cart.query";
import { paymentQuery } from "~domains/payment/payment.query";
import { shippingQuery } from "~domains/shipping/shipping.query";
import { ROUTES } from "~routes";
import { Page } from "~components/Page";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

import { spotsQuery } from "~domains/spot/queries/spots.query";
import { CheckoutForm } from "~domains/order/pages/CheckoutPage/components/CheckoutForm";
import { CheckoutCart } from "~domains/order/pages/CheckoutPage/components/CheckoutCart";
import { useCurrentCitySlug } from "~domains/city/hooks/useCurrentCitySlug";
import { citiesQuery } from "~domains/city/cities.query";
import * as S from "./styled";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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

  const citySlug = useCurrentCitySlug();
  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const city = (cities?.data || []).find((c) => c.slug === citySlug);

  useEffect(() => {
    if (cart?.data && cart.data.length < 1) {
      navigate(ROUTES.CATEGORY.path);
    }
  }, [cart]);

  const renderCheckoutForm = () => {
    const loading =
      isCitiesLoading ||
      isCartLoading ||
      isUserLoading ||
      isShippingMethodsLoading ||
      isSpotsLoading ||
      isPaymentMethodsLoading;

    if (loading) {
      return <CheckoutForm loading />;
    }

    return (
      <CheckoutForm
        // remount component after signin to update form
        key={user ? "one" : "second"}
        cart={cart}
        city={city}
        shippingMethods={shippingMethods}
        paymentMethods={paymentMethods}
        user={user}
        spots={spots}
      />
    );
  };

  const renderCheckoutCart = () => {
    if (isCartLoading) {
      return <CheckoutCart loading={true} />;
    }
    return <CheckoutCart cart={cart} />;
  };

  return (
    <Page>
      <Container>
        <Heading>{t("checkout.title")}</Heading>
        <S.Container>
          {renderCheckoutForm()}
          {renderCheckoutCart()}
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
