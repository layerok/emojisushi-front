import { Container, Heading } from "~components";
import { CheckoutForm, CheckoutCart } from "./components";
import { useTranslation } from "react-i18next";
import { cartQuery, paymentQuery, shippingQuery } from "~queries";
import * as S from "./styled";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { spotsQuery } from "~domains/spot/queries/spots.query";

const CheckoutPage = () => {
  const { t } = useTranslation();

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

  return (
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
          <CheckoutCart
            cart={cart}
            onEmpty={() => {
              navigate("/category");
            }}
          />
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
