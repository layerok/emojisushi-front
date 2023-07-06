import { Header } from "../Header";
import { Footer } from "../Footer";
import * as S from "./styled";
import { useWindowScroll } from "react-use";
import { StickyToTopBtn, Sticky, TinyCartButton, CartModal } from "~components";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { cartQuery } from "~queries";
import { CartProduct } from "~models";
import { IUser, IGetCartRes, IGetCitiesRes, ICity, ISpot } from "~api/types";
import { citiesQuery } from "~queries/cities.query";
import { spotQuery } from "~domains/spot/queries/spot.query";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { getFromLocalStorage } from "~utils/ls.utils";

export const Layout = ({ children, ...rest }: { children?: ReactNode }) => {
  // todo: debounce it
  const { x, y } = useWindowScroll();
  const showStickyCart = y > 100;

  const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
  const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
  const { data: user, isLoading: isUserLoading } = useUser();

  const { data: spot, isLoading: isSpotLoading } = useQuery(
    spotQuery(getFromLocalStorage("selectedSpotSlug"))
  );

  const items = (cart?.data || []).map((json) => new CartProduct(json));

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
              <TinyCartButton price={cart.total} />
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

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign(Component, {
  displayName: "LazyLayout",
});
