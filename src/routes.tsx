import { defer, Navigate } from "react-router-dom";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { Layout } from "~layout/Layout";
import {
  EnsureLocation,
  loader as ensureLocationLoader,
} from "~components/EnsureLocation";
import { QueryOptions } from "react-query";
import MenuApi, { IGetCategoriesResponse } from "~api/menu.api";
import { IGetCategoriesParams } from "~api/menu.api.types";
import { queryClient } from "~query-client";
import { cartPageLoader } from "~pages/Cart/CartPage/CartPage";
import { cartUpdateAction } from "~pages/Cart/UpdateCartPage/UpdateCartPage";
import { cartDeleteAction } from "~pages/Cart/DeleteCartPage/DeleteCartPage";
import WishlistApi from "~api/wishlist.api";
import { wishlistQuery } from "~pages/Wishlist";

export const categoriesQuery = (
  params?: IGetCategoriesParams
): QueryOptions => ({
  queryKey: ["categories", "list", params ?? "all"],
  queryFn: () => MenuApi.getCategories(params).then((res) => res.data),
});

export type CategoryIndexLoaderResolvedData = {
  categories: IGetCategoriesResponse;
};

export const categoryLoaderIndex = ({ params }) => {
  const query = categoriesQuery();
  return defer({
    categories:
      queryClient.getQueryData(query.queryKey) ?? queryClient.fetchQuery(query),
  } as CategoryIndexLoaderResolvedData);
};

const wishilstAddAction = async ({ request }) => {
  let formData = await request.formData();
  const product_id = formData.get("product_id");
  const quantity = formData.get("quantity");

  const res = await WishlistApi.addItem({
    product_id,
    quantity,
  });
  queryClient.setQueryData(wishlistQuery.queryKey, res.data);
  return res.data;
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
                    id: "wishlist",
                    path: "wishlist",
                    lazy: () => import("~pages/Wishlist"),
                    children: [
                      {
                        path: "add",
                        id: "wishlist-add",
                        // element: <Navigate to={"../"} />,
                        action: wishilstAddAction,
                      },
                    ],
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
