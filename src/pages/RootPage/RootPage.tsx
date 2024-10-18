import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useSearchParams,
} from "react-router-dom";
import { useAppStore } from "~stores/appStore";
import { LOCATION_CONFIRMED_SEARCH_PARAM } from "~common/constants";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

const RootPage = () => {
  const [searchParams] = useSearchParams();
  const appStore = useAppStore();

  if (searchParams.has(LOCATION_CONFIRMED_SEARCH_PARAM)) {
    searchParams.delete(LOCATION_CONFIRMED_SEARCH_PARAM);
    appStore.setUserConfirmedLocation(true);
    return (
      <Navigate
        replace
        to={{
          search: searchParams.toString(),
        }}
      />
    );
  }
  return (
    <>
      <Outlet />
      <ScrollRestoration
        getKey={(location, matches) => {
          // default behavior
          return location.key;
        }}
      />
    </>
  );
};

export const Component = RootPage;

export const ErrorBoundary = DefaultErrorBoundary;
