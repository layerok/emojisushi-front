import { Navigate } from "react-router-dom";
import "normalize.css";
import { ProtectedRoute } from "~components/ProtectedRoute";

export const routes = [
  {
    path: "/",
    lazy: () => import("~components/EnsureLocation"),
    children: [
      {
        index: true,
        lazy: () => import("~pages/SelectLocation"),
      },
      {
        path: ":citySlug/:spotSlug",
        children: [
          {
            index: true,
            element: <Navigate to={"category"} />,
          },
          {
            path: "category/:categorySlug?",
            lazy: () => import("~pages/Category"),
          },
          {
            path: "thankyou",
            lazy: () => import("~pages/ThankYou"),
          },
          {
            path: "dostavka-i-oplata",
            lazy: () => import("~pages/Delivery"),
          },
          {
            path: "checkout",
            lazy: () => import("~pages/Checkout"),
          },
          {
            path: "wishlist",
            lazy: () => import("~pages/Wishlist"),
          },
          {
            element: <ProtectedRoute redirectPath={"/"} />,
            children: [
              {
                path: "account",
                element: <Navigate to={"/account/profile"} />,
              },
              {
                path: "account/profile",
                lazy: () => import("~pages/Profile"),
              },
              {
                path: "account/recover-password",
                lazy: () => import("~pages/UpdatePassword"),
              },
              {
                path: "account/saved-addresses",
                lazy: () => import("~pages/SavedAddresses"),
              },
              {
                path: "account/orders",
                lazy: () => import("~pages/MyOrders"),
              },
            ],
          },
          {
            path: "reset-password",
            children: [
              {
                index: true,
                lazy: () => import("~pages/ResetPassword"),
              },
              {
                path: ":code",
                lazy: () => import("~pages/ResetPassword"),
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
