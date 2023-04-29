import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import {
  StickyToTopBtn,
  Sticky,
  TinyCartButton,
  CartModal,
  Container,
} from "~components";
import { ReactNode, Suspense } from "react";
import { Await, Outlet, redirect, useLoaderData } from "react-router-dom";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { authApi, cartApi } from "~api";
import { CartProduct } from "~models";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { IUser, IGetCartRes, IGetCitiesRes } from "~api/types";
import { citiesQuery } from "~queries/cities.query";

export const Layout = ({ children, ...rest }: { children?: ReactNode }) => {
  const { x, y } = useWindowScroll();

  const { cart } = useLoaderData() as LayoutRouteLoaderData;

  const { cities } = useLoaderData() as any;

  const showStickyCart = y > 100;

  const items = (cart?.data || []).map((json) => new CartProduct(json));
  const cartTotal = useOptimisticCartTotalPrice({ items });

  return (
    <S.Layout {...rest}>
      <Suspense fallback={<Header loading />}>
        <Await resolve={cities}>
          <Header />
        </Await>
      </Suspense>

      <S.Main>
        <Container>
          <S.Content>
            <Outlet />
          </S.Content>
        </Container>
      </S.Main>

      <Suspense fallback={<Footer loading={true} />}>
        <Await resolve={cities}>
          <Footer />
        </Await>
      </Suspense>

      <Suspense>
        <Await resolve={cart}>
          <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
            <CartModal>
              <div>
                <TinyCartButton price={cartTotal} />
              </div>
            </CartModal>
          </Sticky>
        </Await>
      </Suspense>

      <StickyToTopBtn />
    </S.Layout>
  );
};

export const Component = Layout;

export type LayoutRouteLoaderData = {
  cart: IGetCartRes;
  user: IUser | null;
};

export const layoutLoader = async ({ params }) => {
  // todo: maybe create endpoint for fetching specific city, to check if it exists
  const fetchUserPromise = authApi.fetchUser();

  const fetchCitiesPromise =
    queryClient.getQueryData<IGetCitiesRes>(citiesQuery.queryKey) ??
    queryClient.fetchQuery<IGetCitiesRes>(citiesQuery);

  const fetchCartPromise =
    queryClient.getQueryData(cartQuery.queryKey) ??
    (await queryClient.fetchQuery(cartQuery));

  const cities = await fetchCitiesPromise;

  const city = cities.data.find((city) => city.slug === params.citySlug);

  if (!city) {
    throw redirect("/" + params.lang);
  }

  const spot = city.spots.find((spot) => spot.slug === params.spotSlug);

  if (!spot) {
    throw redirect("/" + params.lang);
  }

  const user = await fetchUserPromise
    .then((res) => res.data)
    .catch((e) => {
      // // 406 simply means that user is not authorzied, no need to throw error in this case
      if (![406].includes(e?.response.status)) {
        throw e;
      }
      return null;
    });

  const cart = await fetchCartPromise;

  return {
    cart,
    user,
    cities,
  } as LayoutRouteLoaderData;
};

const updateCartProduct = async ({ formData }: { formData: FormData }) => {
  const product_id = formData.get("product_id");
  const variant_id = formData.get("variant_id");
  const quantity = formData.get("quantity");

  const res = await cartApi.addProduct({
    product_id,
    quantity,
    variant_id,
  });

  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};

const deleteCartProduct = async ({ formData }: { formData: FormData }) => {
  const cart_product_id = formData.get("cart_product_id");
  const res = await cartApi.removeCartProduct(cart_product_id);
  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};

export const layoutAction = async ({ request }) => {
  let formData = await request.formData();
  if (request.method === "POST") {
    return updateCartProduct({ formData });
  } else if (request.method === "DELETE") {
    return deleteCartProduct({ formData });
  }
};

export const action = layoutAction;

export const loader = layoutLoader;

Object.assign(Component, {
  displayName: "LazyLayout",
});
