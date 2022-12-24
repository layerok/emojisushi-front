import * as React from "react";
import {Navigate, Outlet} from "react-router-dom";

type IProps = {
  user: any;
  redirectPath: string;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
                          user,
                          redirectPath = '/home',
                          children,
                        }: IProps): any => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet/>;
};
