import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import { StickyToTopBtn, Sticky, TinyCartButton, CartModal } from "~components";
import { ReactNode, Suspense } from "react";
import {
  Await,
  Outlet,
  ShouldRevalidateFunction,
  defer,
  useLoaderData,
} from "react-router-dom";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { authApi, cartApi } from "~api";
import { CartProduct } from "~models";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { IUser, IGetCartRes, IGetCitiesRes, ICity, ISpot } from "~api/types";
import { citiesQuery } from "~queries/cities.query";
import { AwaitAll } from "~components/AwaitAll";
import { spotQuery } from "~domains/spot/queries/spot.query";
import { cityQuery } from "~domains/spot/queries/city.query";

export const Layout = ({ children, ...rest }: { children?: ReactNode }) => {
  const { x, y } = useWindowScroll();

  const { cart, cities, user } = useLoaderData() as LayoutRouteLoaderData;

  const showStickyCart = y > 100;

  const items = (cart?.data || []).map((json) => new CartProduct(json));
  const cartTotal = useOptimisticCartTotalPrice({ items });

  return (
    <S.Layout {...rest}>
      <Suspense fallback={<Header loading />}>
        <AwaitAll cities={cities} user={user} cart={cart}>
          {({ cart, cities, user }) => (
            <Header cart={cart} cities={cities.data} user={user} />
          )}
        </AwaitAll>
      </Suspense>

      <S.Main>
        <S.Content>
          <Outlet />
        </S.Content>
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
  cities: IGetCitiesRes;
  city: ICity;
  spot: ISpot;
};

export const layoutLoader = async ({ params }) => {
  const userPromise = authApi
    .fetchUser()
    .then((res) => res.data)
    .catch((e) => {
      // // 406 simply means that user is not authorzied, no need to throw error in this case
      if (![406].includes(e?.response.status)) {
        throw e;
      }
      return null;
    });

  const citiesPromise =
    queryClient.getQueryData<IGetCitiesRes>(citiesQuery.queryKey) ??
    queryClient.fetchQuery<IGetCitiesRes>(citiesQuery);

  const cityQuery_ = cityQuery(params.citySlug);

  const cityPromise =
    queryClient.getQueryData<ICity>(cityQuery_.queryKey) ??
    queryClient.fetchQuery<ICity>(cityQuery_);

  const spotQuery_ = spotQuery(params.spotSlug);

  const spotPromise =
    queryClient.getQueryData<ISpot>(spotQuery_.queryKey) ??
    queryClient.fetchQuery<ISpot>(spotQuery_);

  const cartPromise =
    queryClient.getQueryData<IGetCartRes>(cartQuery.queryKey) ??
    queryClient.fetchQuery<IGetCartRes>(cartQuery);

  return defer({
    cart: cartPromise,
    user: userPromise,
    cities: citiesPromise,
    city: await cityPromise,
    spot: await spotPromise,
  });
};

// todo: figure out how to not refetch user after modifying cart products

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

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  if (currentParams.lang !== nextParams.lang) {
    return false;
  }
};
