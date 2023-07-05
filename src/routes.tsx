import i18next from "i18next";
import { Navigate } from "react-router-dom";
import { Trans } from "react-i18next";
import { getFromLocalStorage, setToLocalStorage } from "~utils/ls.utils";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";

export const routes = [
  {
    path: "/",
    ErrorBoundary: DefaultErrorBoundary,
    children: [
      {
        index: true,
        element: <Navigate to={getFromLocalStorage("i18nextLang") || "uk"} />,
      },
      {
        path: ":lang",
        loader: ({ params }) => {
          i18next.changeLanguage(params.lang);
          setToLocalStorage("i18nextLang", params.lang);
          return null;
        },
        children: [
          {
            index: true,
            lazy: () => import("~domains/spot/pages/SelectLocationPage"),
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
                id: "categories",
                children: [
                  {
                    index: true,
                    lazy: () =>
                      import("~domains/category/pages/SelectCategoryPage"),
                  },
                  {
                    path: ":categorySlug",
                    lazy: () => import("~domains/product/pages/ProductPage"),
                    id: "category",
                  },
                ],
              },
              {
                path: "thankyou",
                lazy: () => import("~domains/order/pages/ThankYouPage"),
              },
              {
                path: "dostavka-i-oplata",
                lazy: () => import("~domains/spot/pages/DeliveryPage"),
              },
              {
                path: "checkout",
                lazy: () => import("~domains/order/pages/CheckoutPage"),
              },
              {
                id: "wishlist",
                path: "wishlist",
                lazy: () => import("~domains/wishlist/pages/WishlistPage"),
              },

              {
                path: "account",
                lazy: () => import("~layout/CabinetLayout"),
                children: [
                  {
                    index: true,
                    element: <Navigate to={"profile"} />,
                  },
                  {
                    path: "profile",

                    children: [
                      {
                        index: true,
                        lazy: () =>
                          import("~domains/cabinet/pages/ProfilePage"),
                        handle: {
                          title: () => (
                            <Trans i18nKey={"account.profile.title"} />
                          ),
                        },
                      },
                      {
                        path: "edit",
                        lazy: () =>
                          import("~domains/cabinet/pages/EditProfilePage"),
                        handle: {
                          title: () => (
                            <Trans i18nKey={"account.edit-profile.title"} />
                          ),
                        },
                      },
                    ],
                  },
                  {
                    path: "recover-password",
                    lazy: () =>
                      import("~domains/cabinet/pages/UpdatePasswordPage"),
                    handle: {
                      title: () => (
                        <Trans i18nKey={"account.changePassword.title"} />
                      ),
                    },
                  },
                  {
                    path: "saved-addresses",
                    lazy: () =>
                      import("~domains/cabinet/pages/SavedAddressesPage"),
                    handle: {
                      title: () => (
                        <Trans i18nKey={"account.addresses.title"} />
                      ),
                    },
                  },
                  {
                    path: "orders",
                    lazy: () => import("~domains/cabinet/pages/MyOrdersPage"),
                    handle: {
                      title: () => <Trans i18nKey={"account.orders.title"} />,
                    },
                  },
                ],
              },
            ],
          },
          {
            path: "reset-password",
            children: [
              {
                index: true,
                lazy: () => import("~domains/cabinet/pages/ResetPasswordPage"),
              },
              {
                path: ":code",
                lazy: () => import("~domains/cabinet/pages/ResetPasswordPage"),
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
