import { defer, Navigate } from "react-router-dom";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { Layout } from "~layout/Layout";
import { CartStore, CategoriesStore } from "~stores";
import {
  EnsureLocation,
  loader as ensureLocationLoader,
} from "~components/EnsureLocation";

export const spotLoader = () => {
  return defer({
    cart: {
      products: CartStore.fetchItems(),
    },
  });
};

export const categoryLoaderIndex = () => {
  return defer({
    categories: CategoriesStore.fetchItems(),
  });
};

export const routes = [
  {
    lazy: () => import("~pages/LocationSaver"),
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to={"/uk"} />,
      },
      {
        path: ":lang?",
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
                id: "spot",
                loader: spotLoader,
                children: [
                  {
                    index: true,
                    element: <Navigate to={"category"} />,
                  },
                  {
                    path: "category",
                    loader: categoryLoaderIndex,
                    id: "categoryIndex",
                    children: [
                      {
                        index: true,
                        lazy: () => import("~pages/CategoryIndex"),
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
