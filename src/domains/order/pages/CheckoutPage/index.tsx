import { Container, Heading } from "~components";
import {
  CheckoutFormOdessa,
  CheckoutFormChernomorsk,
  CheckoutCart,
} from "./components";
import { useTranslation } from "react-i18next";
import { cartQuery, paymentQuery, shippingQuery } from "~queries";
import * as S from "./styled";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { spotsQuery } from "~domains/spot/queries/spots.query";
import { useAppStore } from "~stores/appStore";
import { useEffect } from "react";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const appStore = useAppStore();

  const { data: user, isLoading: isUserLoading } = useUser();

  const { data: cart, isLoading: isCartLoading } = useQuery({
    ...cartQuery,
    onSuccess: (res) => {
      if (res.data.length < 1) {
        navigate("/category");
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
      navigate("/category");
    }
  }, []);

  return (
    <Container>
      <Heading>{t("checkout.title")}</Heading>
      <S.Container>
        {isCartLoading ||
        isUserLoading ||
        isShippingMethodsLoading ||
        isSpotsLoading ||
        isPaymentMethodsLoading ? (
          appStore.city.slug === "odesa" ? (
            <CheckoutFormOdessa loading />
          ) : (
            <CheckoutFormChernomorsk loading />
          )
        ) : appStore.city.slug === "odesa" ? (
          <CheckoutFormOdessa
            // remount component after signin to update form
            key={user ? "one" : "second"}
            cart={cart}
            shippingMethods={shippingMethods}
            paymentMethods={paymentMethods}
            user={user}
            spots={spots}
          />
        ) : (
          <CheckoutFormChernomorsk
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
  );
};

export const Component = CheckoutPage;

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign(Component, {
  displayName: "LazyCheckoutPage",
});
