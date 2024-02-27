import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { appStore, useAppStore } from "~stores/appStore";
import { CitySlug, LOCATION_CONFIRMED_SEARCH_PARAM } from "~common/constants";
import { QueryOptions } from "@tanstack/react-query";
import { ICity } from "~api/access/access.api.types";
import { accessApi } from "~api";
import { queryClient } from "~query-client";
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
  return <Outlet />;
};

export const Component = RootPage;

export const loader = async () => {
  const allowed = [CitySlug.Odesa, CitySlug.Chornomorsk] as string[];
  const domains = window.location.hostname.split(".");
  const query: QueryOptions<ICity> = {
    queryKey: [
      "main-city",
      allowed.includes(domains[0]) ? domains[0] : allowed[0],
    ],
    queryFn: () =>
      accessApi
        .getCity({
          slug_or_id: allowed.includes(domains[0]) ? domains[0] : allowed[0],
        })
        .then((res) => res.data),
  };
  const city =
    queryClient.getQueryData<ICity>(query.queryKey) ??
    (await queryClient.fetchQuery(query));
  appStore.setCity(city);

  return {
    city,
  };
};

export const ErrorBoundary = DefaultErrorBoundary;
