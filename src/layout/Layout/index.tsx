import { Header } from "../Header";
import { Container } from "~components/Container";
import { Footer } from "../Footer";
import * as S from "./styled";
import { RestaurantClosed } from "~components/modals/RestaurantClosed";
import { observer } from "mobx-react";
import { isClosed } from "~utils/time.utils";
import { useWindowScroll } from "react-use";
import { CartModal } from "~components/modals/CartModal";
import { TinyCartButton } from "~components/TinyCartButton";
import { Sticky } from "../../components/Sticky";
import { StickyToTopBtn } from "../../components/StickyToTopBtn";
import { ReactNode, Suspense } from "react";
import {
  Await,
  defer,
  Outlet,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { loader as ensureLocationLoader } from "~components/EnsureLocation";
import { useCart } from "~hooks/use-cart";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { IGetCartProductsResponse } from "~api/cart.api";

export const Layout = observer(
  ({
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

    return (
      <S.Layout {...rest}>
        <Suspense fallback={<Header showSkeleton />}>
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

        <Suspense fallback={<Footer showSkeleton={true} />}>
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
                  <TinyCartButton price={cart?.total} />
                </div>
              </CartModal>
            </Sticky>
          </Await>
        </Suspense>

        <StickyToTopBtn />
      </S.Layout>
    );
  }
);

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

export const loader = layoutLoader;

Object.assign(Component, {
  displayName: "LazyLayout",
});
