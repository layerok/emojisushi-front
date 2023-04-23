import { Navigate } from "react-router-dom";
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
        children: [
          {
            index: true,
            lazy: () => import("~pages/SelectLocation"),
          },
          {
            path: ":citySlug/:spotSlug",
            id: "layout",
            lazy: () => import("~layout/Layout"),
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
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
