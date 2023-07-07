import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import { StickyToTopBtn, Sticky, TinyCartButton, CartModal } from "~components";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { cartQuery } from "~queries";
import { IUser, IGetCartRes, IGetCitiesRes, ICity, ISpot } from "~api/types";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { spotsQuery } from "~domains/spot/queries/spots.query";

export const Layout = observer(
  ({ children, ...rest }: { children?: ReactNode }) => {
    // todo: debounce it
    const { x, y } = useWindowScroll();
    const showStickyCart = y > 100;

    const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
    const { data: user, isLoading: isUserLoading } = useUser();
    const { data: spots, isLoading: isSpotsLoading } = useQuery(spotsQuery());

    return (
      <S.Layout {...rest}>
        {isCartLoading || isUserLoading || isSpotsLoading ? (
          <Header loading />
        ) : (
          <Header spots={spots} cart={cart} user={user} />
        )}
        <S.Main>
          <S.Content>
            <Outlet />
          </S.Content>
        </S.Main>
        <Footer />
        {!isCartLoading && (
          <Sticky top={"30px"} right={"30px"} show={showStickyCart}>
            <CartModal cart={cart}>
              <div>
                <TinyCartButton price={cart.total} />
              </div>
            </CartModal>
          </Sticky>
        )}
        <StickyToTopBtn />
      </S.Layout>
    );
  }
);

export const Component = Layout;

export type LayoutRouteLoaderData = {
  cart: IGetCartRes;
  user: IUser | null;
  cities: IGetCitiesRes;
  city: ICity;
  spot: ISpot;
};

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign(Component, {
  displayName: "LazyLayout",
});
