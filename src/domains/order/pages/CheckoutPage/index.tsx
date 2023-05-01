import { FlexBox, Heading, Loader } from "~components";
import { CheckoutForm, CheckoutCart } from "./components";
import { useBreakpoint2 } from "~common/hooks";
import {
  Await,
  defer,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { queryClient } from "~query-client";
import { paymentQuery, shippingQuery } from "~queries";
import { Suspense } from "react";
import { AwaitAll } from "~components/AwaitAll";
import { LayoutRouteLoaderData } from "~layout/Layout";

// todo: add skeletons
const CheckoutPage = () => {
  const { isMobile } = useBreakpoint2();
  const { t } = useTranslation();
  const { cart, user } = useRouteLoaderData("layout") as LayoutRouteLoaderData;
  const { shippingMethods, paymentMethods } = useLoaderData() as any;

  return (
    <>
      <Heading>{t("checkout.title")}</Heading>
      <FlexBox
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        style={{ marginTop: "30px" }}
      >
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
        <Suspense fallback={<Loader loading={true} />}>
          <Await resolve={cart}>{(cart) => <CheckoutCart cart={cart} />}</Await>
        </Suspense>
      </FlexBox>
    </>
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
