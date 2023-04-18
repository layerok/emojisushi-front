import { FlexBox, Heading } from "~components";
import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutCart } from "./components/CheckoutCart";
import { useIsMobile } from "~common/hooks";
import {
  Await,
  defer,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import { queryClient } from "~query-client";
import { paymentQuery, shippingQuery } from "~queries";
import { Suspense } from "react";

export const Checkout = observer(() => {
  return <InternalCheckout />;
});

const InternalCheckout = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { cart } = useRouteLoaderData("layout") as any;
  const { shippingMethods, paymentMethods } = useLoaderData() as any;

  return (
    <>
      <Heading>{t("checkout.title")}</Heading>
      <FlexBox
        flexDirection={isMobile ? "column" : "row"}
        justifyContent={"space-between"}
        style={{ marginTop: "30px" }}
      >
        <Suspense fallback={"...loading"}>
          <Await resolve={cart}>
            {(cart) => (
              <Await resolve={shippingMethods}>
                {(shippingMethods) => (
                  <Await resolve={paymentMethods}>
                    {(paymentMethods) => (
                      <>
                        <CheckoutForm
                          shippingMethods={shippingMethods}
                          paymentMethods={paymentMethods}
                          cart={cart}
                        />
                        <CheckoutCart cart={cart} />
                      </>
                    )}
                  </Await>
                )}
              </Await>
            )}
          </Await>
        </Suspense>
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
