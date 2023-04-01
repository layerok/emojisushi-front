import { Header } from "../Header";
import { Container } from "~components/Container";
import { Footer } from "../Footer";
import * as S from "./styled";
import { RestaurantClosed } from "~components/modals/RestaurantClosed";
import { observer } from "mobx-react";
import { isClosed } from "~utils/time.utils";
import { useLocation, useWindowScroll } from "react-use";
import { CartModal } from "~components/modals/CartModal";
import { TinyCartButton } from "~components/TinyCartButton";
import { Sticky } from "../../components/Sticky";
import { StickyToTopBtn } from "../../components/StickyToTopBtn";
import { ReactNode, Suspense, useEffect } from "react";
import { useProductsStore } from "~hooks/use-categories-store";
import { useCartStore } from "~hooks/use-cart-store";
import { Await, Outlet, useRouteLoaderData } from "react-router-dom";
import { loader } from "~components/EnsureLocation";

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
    const location = useLocation();
    const ProductsStore = useProductsStore();
    const CartStore = useCartStore();
    const { cities } = useRouteLoaderData("ensureLocation") as ReturnType<
      typeof loader
    >["data"];

    const showStickyCart = y > 100;

    const closed = isClosed({
      start: [10, 0],
      end: [21, 15],
    });

    useEffect(() => {
      ProductsStore.clearSearch();
    }, [location.pathname]);

    return (
      <S.Layout {...rest}>
        <Suspense fallback={<Header showSkeleton />}>
          <Await resolve={cities}>
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
          <Await resolve={cities}>
            <Footer />
          </Await>
        </Suspense>

        {withRestaurantClosedModal && <RestaurantClosed open={closed} />}

        <Suspense>
          <Await resolve={cities}>
            <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
              <CartModal>
                <div>
                  <TinyCartButton price={CartStore.total} />
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

Object.assign(Component, {
  displayName: "LazyLayout",
});
