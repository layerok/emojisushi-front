import { Container, Heading } from "~components";
import { CheckoutForm, CheckoutCart } from "./components";
import {
  Await,
  Navigate,
  defer,
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { queryClient } from "~query-client";
import { cartQuery, paymentQuery, shippingQuery } from "~queries";
import { Suspense } from "react";
import { AwaitAll } from "~components/AwaitAll";
import { LayoutRouteLoaderData } from "~layout/Layout";
import * as S from "./styled";
import { orderApi } from "~api";
import { AxiosError } from "axios";

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
                // remount component after signin to update form
                key={user ? "one" : "second"}
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

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const phone = formData.get("phone");
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");
  const spot_id_or_slug = formData.get("spot_id_or_slug");
  const address = formData.get("address");
  const address_id = formData.get("address_id");
  const payment_method_id = formData.get("payment_method_id");
  const shipping_method_id = formData.get("shipping_method_id");
  const change = formData.get("change");
  const sticks = formData.get("sticks");
  const comment = formData.get("comment");
  const { lang, citySlug, spotSlug } = params;

  try {
    await orderApi.place({
      phone,
      firstname,
      lastname,
      email,
      spot_id_or_slug,

      address,
      address_id,
      payment_method_id,
      shipping_method_id,

      change,
      sticks: +sticks,
      comment,
    });

    await queryClient.removeQueries(cartQuery.queryKey);
    return redirect("/" + [lang, citySlug, spotSlug, "thankyou"].join("/"));
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data?.errors) {
        return e.response?.data;
      }
    }
  }
};
