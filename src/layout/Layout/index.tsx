import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { isClosed } from "~utils/time.utils";
import { useWindowScroll } from "react-use";
import {
  StickyToTopBtn,
  Sticky,
  TinyCartButton,
  CartModal,
  RestaurantClosed,
  Container,
} from "~components";
import { ReactNode, Suspense } from "react";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { loader as ensureLocationLoader } from "~components/EnsureLocation";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import CartApi, { IGetCartProductsResponse } from "~api/cart.api";
import { CartProduct } from "~models";
import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";

export const Layout = ({
  children,
  withRestaurantClosedModal = false,
  mainProps = {},
  containerProps = {},
  ...rest
}: {
  children?: ReactNode;
  withRestaurantClosedModal?: boolean;
  mainProps?: Record<string, any>;
  containerProps?: Record<string, any>;
}) => {
  const { x, y } = useWindowScroll();

  const { cart } = useLoaderData() as LayoutLoaderReturnType;

  // todo: rename citiesQuery, it is not query, it is response
  const { citiesQuery } = useRouteLoaderData("ensureLocation") as ReturnType<
    typeof ensureLocationLoader
  >["data"];

  const showStickyCart = y > 100;

  const closed = isClosed({
    start: [10, 0],
    end: [21, 15],
  });

  const items = (cart?.data || []).map((json) => new CartProduct(json));
  const cartTotal = useOptimisticCartTotalPrice({ items });

  return (
    <S.Layout {...rest}>
      <Suspense fallback={<Header loading />}>
        <Await resolve={citiesQuery}>
          <Header />
        </Await>
      </Suspense>

      <S.Main {...mainProps}>
        <Container {...containerProps}>
          <S.Content>
            <Outlet />
          </S.Content>
        </Container>
      </S.Main>

      <Suspense fallback={<Footer loading={true} />}>
        <Await resolve={citiesQuery}>
          <Footer />
        </Await>
      </Suspense>

      {withRestaurantClosedModal && <RestaurantClosed open={closed} />}

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

export type LayoutLoaderReturnType = {
  cart: IGetCartProductsResponse;
};

export const layoutLoader = () => {
  return defer({
    cart:
      queryClient.getQueryData(cartQuery.queryKey) ??
      queryClient.fetchQuery(cartQuery),
  } as LayoutLoaderReturnType);
};

const updateCartProduct = async ({ formData }: { formData: FormData }) => {
  const product_id = formData.get("product_id");
  const variant_id = formData.get("variant_id");
  const quantity = formData.get("quantity");

  const res = await CartApi.addProduct({
    product_id,
    quantity,
    variant_id,
  });

  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};

const deleteCartProduct = async ({ formData }: { formData: FormData }) => {
  const cart_product_id = formData.get("cart_product_id");
  const res = await CartApi.removeCartProduct(cart_product_id);
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
