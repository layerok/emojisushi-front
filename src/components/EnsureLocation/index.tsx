import { toJS } from "mobx";
import { useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useSpot } from "~hooks/use-spot";
import LocalStorageService from "~services/local-storage.service";
import { CitiesStore, AuthStore } from "~stores";

export const EnsureLocation = ({
  redirectPath = "/",
  children,
}: {
  children?: React.ReactNode;
  redirectPath?: string;
}): any => {
  const city = useCity();
  const spot = useSpot();
  const location = useLocation();

  if ((!city || !spot) && location.pathname !== redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export const Component = EnsureLocation;

Object.assign(Component, {
  displayName: "LazyEnsureLocation",
});

export const loader = async ({ params }) => {
  await CitiesStore.loadItems(true);
  return toJS(CitiesStore.items);
};

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return currentParams.lang !== nextParams.lang;
};
