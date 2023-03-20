import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCity } from "~hooks/use-city";
import { useSpot } from "~hooks/use-spot";

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
