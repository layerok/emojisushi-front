import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "~hooks/use-auth-store";

type IProps = {
  redirectPath: string;
  children?: React.ReactNode;
};

export const ProtectedRoute = ({
  redirectPath = "/home",
  children,
}: IProps): any => {
  const authStore = useAuthStore();
  if (!authStore.user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export const Component = ProtectedRoute;

Object.assign(Component, {
  display: "LazyProtectedRoute",
});
