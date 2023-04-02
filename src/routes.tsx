import { defer, Navigate } from "react-router-dom";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { Layout } from "~layout/Layout";
import {
  EnsureLocation,
  loader as ensureLocationLoader,
} from "~components/EnsureLocation";
import { QueryOptions } from "react-query";
import MenuApi from "~api/menu.api";
import { IGetCategoriesParams } from "~api/menu.api.types";
import { queryClient } from "~query-client";
import CartApi from "~api/cart.api";
import { cartPageLoader } from "~pages/Cart/CartPage/CartPage";
import { cartUpdateAction } from "~pages/Cart/UpdateCartPage/UpdateCartPage";
import { cartDeleteAction } from "~pages/Cart/DeleteCartPage/DeleteCartPage";

export const cartQuery: QueryOptions = {
  queryKey: ["cart"],
  queryFn: () => CartApi.getProducts(),
};

export const spotLoader = () => {
  return null;
  // return defer({
  //   cartQuery:
  //     queryClient.getQueryData(cartQuery.queryKey) ??
  //     queryClient.fetchQuery(cartQuery),
  // });
};

const categoriesQuery = (params?: IGetCategoriesParams): QueryOptions => ({
  queryKey: ["categories", "list", params ?? "all"],
  queryFn: () => MenuApi.getCategories(params),
});

export const categoryLoaderIndex = ({ params }) => {
  const query = categoriesQuery();
  return defer({
    categoriesQuery:
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
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
                    id: "wishlist",
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
                        path: "view",
                        loader: cartPageLoader,
                      },
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
