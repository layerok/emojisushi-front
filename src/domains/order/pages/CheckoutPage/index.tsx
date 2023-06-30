import { Container, Heading } from "~components";
import { CheckoutForm, CheckoutCart } from "./components";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cartQuery, paymentQuery, shippingQuery } from "~queries";
import * as S from "./styled";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "~api";

const CheckoutPage = () => {
  const { t } = useTranslation();
  const { lang, citySlug, spotSlug } = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryFn: () => {
      return authApi
        .fetchUser()
        .then((res) => res.data)
        .catch((e) => {
          // // 406 simply means that user is not authorzied, no need to throw error in this case
          if (![406].includes(e?.response.status)) {
            throw e;
          }
          return null;
        });
    },
    queryKey: ["user"],
  });

  const { data: cart, isLoading: isCartLoading } = useQuery({
    ...cartQuery,
    onSuccess: (data) => {
      if (data.data.length < 1) {
        navigate("/" + [lang, citySlug, spotSlug].join("/"));
      }
    },
  });
  const { data: shippingMethods, isLoading: isShippingMethodsLoading } =
    useQuery(shippingQuery);
  const { data: paymentMethods, isLoading: isPaymentMethodsLoading } =
    useQuery(paymentQuery);

  return (
    <Container>
      <Heading>{t("checkout.title")}</Heading>
      <S.Container>
        {isCartLoading ||
        isUserLoading ||
        isShippingMethodsLoading ||
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

Object.assign(Component, {
  displayName: "LazyCheckoutPage",
});
