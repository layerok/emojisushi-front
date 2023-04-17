import { FlexBox } from "~components/FlexBox";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutCart } from "./components/CheckoutCart";
import { Heading } from "~components/Heading";
import { useIsMobile } from "~common/hooks/useBreakpoint";
import {
  Await,
  defer,
  useAsyncValue,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { IGetCartProductsResponse } from "~api/cart.api";
import { queryClient } from "~query-client";
import { paymentQuery, shippingQuery } from "~queries";

export const Checkout = observer(() => {
  const { cart } = useRouteLoaderData("layout") as any;

  return (
    <Suspense fallback={"...loading"}>
      <Await resolve={cart}>
        <AwaitedCheckout />
      </Await>
    </Suspense>
  );
});

const AwaitedCheckout = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cart = useAsyncValue() as IGetCartProductsResponse;

  useEffect(() => {
    if (cart.data.length === 0) {
      // todo: redirect to previous page, not to index page
      navigate("/");
    }
  }, [cart.data]);
  return (
    <>
      <Heading>{t("checkout.title")}</Heading>
      <FlexBox
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        style={{ marginTop: "30px" }}
      >
        <CheckoutForm />
        <CheckoutCart />
      </FlexBox>
    </>
  );
};

export const Component = Checkout;
Object.assign(Component, {
  displayName: "LazyCheckout",
});

export const loader = async () => {
  return defer({
    paymentMethods:
      queryClient.getQueryData(paymentQuery.queryKey) ??
      queryClient.fetchQuery(paymentQuery),
    shippingMethods:
      queryClient.getQueryData(shippingQuery.queryKey) ??
      queryClient.fetchQuery(shippingQuery),
  });
};
