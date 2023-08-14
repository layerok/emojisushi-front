import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import {
  StickyToTopBtn,
  Sticky,
  TinyCartButton,
  CartModal,
  LocationsModal,
} from "~components";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { cartQuery } from "~queries";
import { IUser, IGetCartRes, IGetCitiesRes, ICity, ISpot } from "~api/types";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";
import { citiesQuery } from "~queries/cities.query";

export const Layout = observer(
  ({ children, ...rest }: { children?: ReactNode }) => {
    // todo: debounce it
    const { x, y } = useWindowScroll();
    const showStickyCart = y > 100;

    const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
    const { data: user, isLoading: isUserLoading } = useUser();

    const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
    const appStore = useAppStore();

    return (
      <S.Layout {...rest}>
        {isCartLoading || isUserLoading || isCitiesLoading ? (
          <Header loading />
        ) : (
          <Header cities={cities.data} cart={cart} user={user} />
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
        {!isCitiesLoading && (
          <LocationsModal
            open={!appStore.userConfirmedLocation}
            cities={cities.data}
          />
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
