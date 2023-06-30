import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import { StickyToTopBtn, Sticky, TinyCartButton, CartModal } from "~components";
import { ReactNode } from "react";
import {
  ActionFunctionArgs,
  Outlet,
  redirect,
  useParams,
} from "react-router-dom";
import { queryClient } from "~query-client";
import { cartQuery, wishlistsQuery } from "~queries";
import { authApi, cartApi } from "~api";
import { CartProduct } from "~models";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { IUser, IGetCartRes, IGetCitiesRes, ICity, ISpot } from "~api/types";
import { citiesQuery } from "~queries/cities.query";
import { spotQuery } from "~domains/spot/queries/spot.query";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

export const Layout = ({ children, ...rest }: { children?: ReactNode }) => {
  // todo: debounce it
  const { x, y } = useWindowScroll();
  const { spotSlug, citySlug } = useParams();
  const showStickyCart = y > 100;

  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
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

  const { data: spot, isLoading: isSpotLoading } = useQuery(
    spotQuery(spotSlug)
  );

  const items = (cart?.data || []).map((json) => new CartProduct(json));
  const cartTotal = useOptimisticCartTotalPrice({ items });

  return (
    <S.Layout {...rest}>
      {isCartLoading || isUserLoading || isCitiesLoading ? (
        <Header loading />
      ) : (
        <Header cart={cart} cities={cities.data} user={user} />
      )}

      <S.Main>
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Main>

      {isSpotLoading ? <Footer loading={true} /> : <Footer spot={spot} />}

      {!isCartLoading && (
        <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
          <CartModal cart={cart}>
            <div>
              <TinyCartButton price={cartTotal} />
            </div>
          </CartModal>
        </Sticky>
      )}
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

  await queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};

const deleteCartProduct = async ({ formData }: { formData: FormData }) => {
  const cart_product_id = formData.get("cart_product_id");
  const res = await cartApi.removeCartProduct(cart_product_id);
  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};

const register = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: any;
}) => {
  const { spotSlug, lang, citySlug } = params;

  const email = formData.get("email") + "";
  const password = formData.get("password") + "";
  const password_confirmation = formData.get("password") + "";
  const name = formData.get("name") + "";
  const surname = formData.get("surname") + "";
  const agree = !!formData.get("agree");
  const spot_slug_or_id = spotSlug;

  try {
    const res = await authApi.register({
      email,
      password,
      password_confirmation,
      name,
      surname,
      agree,
      // check if this field is needed
      spot_slug_or_id,
    });
    const { token } = res.data.data;
    Cookies.set("jwt", token);
    await queryClient.removeQueries(wishlistsQuery.queryKey);
    await queryClient.removeQueries(cartQuery.queryKey);

    return redirect(
      "/" + [lang, citySlug, spotSlug, "account", "profile"].join("/")
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data?.errors) {
        return e.response.data;
      }
    }
    throw e;
  }
};

const login = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: any;
}) => {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const redirect_to = formData.get("redirect_to") as string | null;
  const { spotSlug, lang, citySlug } = params;
  const default_redirect_to =
    "/" + [lang, citySlug, spotSlug, "account", "profile"].join("/");
  try {
    const res = await authApi.login({
      email,
      password,
    });

    const { token } = res.data.data;
    Cookies.set("jwt", token);

    await queryClient.removeQueries(wishlistsQuery.queryKey);
    await queryClient.removeQueries(cartQuery.queryKey);
    return redirect(redirect_to || default_redirect_to);
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data?.errors) {
        return e.response.data;
      }
    }
    throw e;
  }
};

const resetPassword = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: any;
}) => {
  const email = formData.get("email") + "";

  try {
    await authApi.restorePassword(email);
    return {
      isSent: true,
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response.data?.errors) {
        return e.response.data;
      }
    }
    throw e;
  }
};

const logout = async ({
  formData,
  params,
}: {
  formData: FormData;
  params: any;
}) => {
  const { lang, citySlug, spotSlug } = params;
  Cookies.remove("jwt");
  await queryClient.removeQueries(wishlistsQuery.queryKey);
  await queryClient.removeQueries(cartQuery.queryKey);
  return redirect("/" + [lang, citySlug, spotSlug].join("/"));
};

export const layoutAction = async ({ request, params }: ActionFunctionArgs) => {
  let formData = await request.formData();
  const type = formData.get("type");
  if (request.method === "POST") {
    if (type === "register") {
      return register({ formData, params });
    } else if (type === "login") {
      return login({ formData, params });
    } else if (type === "reset-password") {
      return resetPassword({ formData, params });
    } else if (type === "logout") {
      return logout({ formData, params });
    }
    return updateCartProduct({ formData });
  } else if (request.method === "DELETE") {
    return deleteCartProduct({ formData });
  }
};

export const action = layoutAction;

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  if (currentParams.lang !== nextParams.lang) {
    return false;
  }
};

Object.assign(Component, {
  displayName: "LazyLayout",
});
