import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { Layout, layoutAction, layoutLoader } from "~layout/Layout";
import {
  EnsureLocation,
  loader as ensureLocationLoader,
} from "~components/EnsureLocation";
import { cartUpdateAction } from "~pages/Cart/UpdateCartPage/UpdateCartPage";
import { cartDeleteAction } from "~pages/Cart/DeleteCartPage/DeleteCartPage";
import { categoriesLoader } from "~pages/Categories";

export const routes = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to={"/uk"} />,
      },
      {
        path: ":lang",
        element: <EnsureLocation redirectPath="/uk" />,
        loader: ensureLocationLoader,
        id: "ensureLocation",
        children: [
          {
            index: true,
            lazy: () => import("~pages/SelectLocation"),
          },
          {
            lazy: () => import("~components/CheckUser"),
            id: "checkUser",
            children: [
              {
                path: ":citySlug/:spotSlug",
                element: <Layout withRestaurantClosedModal={true} />,
                id: "layout",
                action: layoutAction,
                loader: layoutLoader,
                children: [
                  {
                    index: true,
                    element: <Navigate to={"category"} />,
                  },
                  {
                    path: "category",
                    loader: categoriesLoader,
                    id: "categories",
                    children: [
                      {
                        index: true,
                        lazy: () => import("~pages/Categories"),
                      },
                      {
                        path: ":categorySlug",
                        lazy: () => import("~pages/Category"),
                        id: "category",
                      },
                    ],
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
                    id: "wishlist",
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
                  {
                    path: "cart",
                    children: [
                      {
                        path: "update",
                        action: cartUpdateAction,
                      },
                      {
                        path: "delete",
                        action: cartDeleteAction,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
