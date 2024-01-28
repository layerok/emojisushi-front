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
  RestaurantClosed,
  TelegramModal,
  ContactsModal,
  MobMenuModal,
  AuthModal,
} from "~components";
import { ReactNode, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { cartQuery } from "~queries";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "~hooks/use-auth";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { observer } from "mobx-react";
import { useAppStore } from "~stores/appStore";
import { citiesQuery } from "~queries/cities.query";
import NiceModal from "@ebay/nice-modal-react";
import { ModalIDEnum } from "~common/modal.constants";
import { isClosed } from "~utils/time.utils";
import { appConfig } from "~config/app";
import { AppUpdateModal } from "src/components/modals/AppUpdateModal";

export const Layout = observer(
  ({ children, ...rest }: { children?: ReactNode }) => {
    // todo: debounce it
    const { x, y } = useWindowScroll();
    const showStickyCart = y > 100;

    const { data: cart, isLoading: isCartLoading } = useQuery(cartQuery);
    const { data: user, isLoading: isUserLoading } = useUser();

    const { data: cities, isLoading: isCitiesLoading } = useQuery(citiesQuery);
    const appStore = useAppStore();

    useEffect(() => {
      const closed = isClosed({
        start: appConfig.workingHours[0],
        end: appConfig.workingHours[1],
      });

      if (closed) {
        NiceModal.show(ModalIDEnum.RestaurantClosed);
      } else if (!appStore.userConfirmedLocation) {
        NiceModal.show(ModalIDEnum.LocationModal);
      }
    }, []);

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
            <TinyCartButton
              onClick={() => {
                NiceModal.show(ModalIDEnum.CartModal);
              }}
              price={cart.total}
            />
          </Sticky>
        )}
        <LocationsModal id={ModalIDEnum.LocationModal} />
        <RestaurantClosed id={ModalIDEnum.RestaurantClosed} />
        <TelegramModal id={ModalIDEnum.TelegramModal} />
        <ContactsModal id={ModalIDEnum.ContactsModal} />
        <CartModal id={ModalIDEnum.CartModal} />

        <AuthModal id={ModalIDEnum.AuthModal} />
        <MobMenuModal id={ModalIDEnum.MobMenuModal} />
        <StickyToTopBtn />
      </S.Layout>
    );
  }
);

export const Component = Layout;

export const ErrorBoundary = DefaultErrorBoundary;

Object.assign(Component, {
  displayName: "LazyLayout",
});
