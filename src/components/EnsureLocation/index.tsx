import { toJS } from "mobx";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useSpot } from "~hooks/use-spot";
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

export const loader = async () => {
  await CitiesStore.loadItems(true);
  try {
    await AuthStore.fetchUser();
  } catch (e: any) {
    // 406 simply means that user is not authorzied, no need to throw error in this case
    if (![406].includes(e?.response.status)) {
      throw e;
    }
  }

  return toJS(CitiesStore.items);
};
