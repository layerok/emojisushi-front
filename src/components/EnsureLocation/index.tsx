import { QueryClient, QueryOptions } from "react-query";
import { defer, Navigate, Outlet, useLocation } from "react-router-dom";
import AccessApi from "~api/access.api";
import { useCity } from "~hooks/use-city";
import { useSpot } from "~hooks/use-spot";
import { queryClient } from "~query-client";

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
  // console.log("dbg ensureLocation", city?.slug, spot?.slug);

  // if ((!city || !spot) && location.pathname !== redirectPath) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  return children ? children : <Outlet />;
};

export const Component = EnsureLocation;

Object.assign(Component, {
  displayName: "LazyEnsureLocation",
});

export const citiesQuery: QueryOptions = {
  queryFn: () =>
    AccessApi.getCities({
      includeSpots: true,
    }).then((res) => res.data),
  queryKey: ["cities", "list", "all"],
};

const qurifiedLoader = (queryClient: QueryClient) => {
  return ({ params }) => {
    return defer({
      citiesQuery:
        queryClient.getQueryData(citiesQuery.queryKey) ??
        queryClient.fetchQuery(citiesQuery),
    });
  };
};

export const citiesLoader = qurifiedLoader(queryClient);

export const loader = citiesLoader;

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  return currentParams.lang !== nextParams.lang;
};
