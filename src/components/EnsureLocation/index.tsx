import { defer, Navigate, Outlet, useLocation } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useSpot } from "~hooks/use-spot";
import { CitiesStore } from "~stores";

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

export const loader = ({ params }) => {
  return defer({
    cities: CitiesStore.loadItems(true),
  });
};

export const shouldRevalidate = ({ currentParams, nextParams }) => {
  if (currentParams.lang !== nextParams.lang) {
    return true;
  }
  // if return undefined, then react-router runs default revalidation logic
};
