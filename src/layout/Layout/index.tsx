import { Header } from "../Header";
import { Container } from "~components/Container";
import { Footer } from "../Footer";
import { Banner } from "../Banner";
import * as S from "./styled";
import { RestaurantClosed } from "~components/modals/RestaurantClosed";
import { Preloader } from "../Preloader";
import { observer } from "mobx-react";
import { isClosed } from "~utils/time.utils";
import { useLocation, useWindowScroll } from "react-use";
import { CartModal } from "~components/modals/CartModal";
import { TinyCartButton } from "~components/TinyCartButton";
import { Sticky } from "../../components/Sticky";
import { StickyToTopBtn } from "../../components/StickyToTopBtn";
import { ReactNode, useEffect } from "react";
import { useAppStore } from "~hooks/use-app-store";
import { useProductsStore } from "~hooks/use-categories-store";
import { useCartStore } from "~hooks/use-cart-store";
import { Outlet } from "react-router-dom";

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
    const AppStore = useAppStore();
    const ProductsStore = useProductsStore();
    const CartStore = useCartStore();

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
        {AppStore.loading && <Preloader />}
        <Header />
        <S.Main {...mainProps}>
          <Container {...containerProps}>
            <S.Content>
              <Outlet />
            </S.Content>
          </Container>
        </S.Main>
        <Footer />

        {withRestaurantClosedModal && <RestaurantClosed open={closed} />}

        <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
          <CartModal>
            <div>
              <TinyCartButton price={CartStore.total} />
            </div>
          </CartModal>
        </Sticky>
        <StickyToTopBtn />
      </S.Layout>
    );
  }
);

export const Component = Layout;

Object.assign(Component, {
  displayName: "LazyLayout",
});
