import { QueryOptions } from "@tanstack/react-query";
import { Trans } from "react-i18next";
import {
  Navigate,
  Outlet,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { accessApi } from "~api";
import { ICity, IGetCategoriesRes } from "~api/types";
import { DefaultErrorBoundary } from "~components/DefaultErrorBoundary";
import { categoriesQuery } from "~queries";
import { queryClient } from "~query-client";
import { appStore, useAppStore } from "~stores/appStore";

const RootIndexElement = () => {
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof rootIndexLoader>
  >;
  return <Navigate to={"/category/" + loaderData.categories.data[0].slug} />;
};

const rootIndexLoader = async () => {
  const _categoriesQuery = categoriesQuery();

  const categories =
    queryClient.getQueryData<IGetCategoriesRes>(_categoriesQuery.queryKey) ??
    (await queryClient.fetchQuery<IGetCategoriesRes>(_categoriesQuery));

  return {
    categories,
  };
};

const RootElement = () => {
  const [searchParams] = useSearchParams();
  const appStore = useAppStore();

  if (searchParams.has("location_confirmed")) {
    searchParams.delete("location_confirmed");
    appStore.setUserConfirmedLocation(true);
    return (
      <Navigate
        to={{
          search: searchParams.toString(),
        }}
      />
    );
  }
  return <Outlet />;
};

const rootLoader = async () => {
  const allowed = ["odesa", "chorno"];
  const domains = window.location.hostname.split(".");
  const query: QueryOptions<ICity> = {
    queryKey: [
      "main-city",
      allowed.includes(domains[0]) ? domains[0] : allowed[0],
    ],
    queryFn: () =>
      accessApi
        .getCity({
          slug_or_id: allowed.includes(domains[0]) ? domains[0] : allowed[0],
        })
        .then((res) => res.data),
  };
  const city =
    queryClient.getQueryData<ICity>(query.queryKey) ??
    (await queryClient.fetchQuery(query));
  appStore.setCity(city);

  return {
    city,
  };
};

export const routes = [
  {
    path: "/",
    ErrorBoundary: DefaultErrorBoundary,
    loader: rootLoader,
    id: "root",
    element: <RootElement />,
    children: [
      {
        index: true,
        element: <RootIndexElement />,
        loader: rootIndexLoader,
      },
      {
        id: "layout",
        lazy: () => import("~layout/Layout"),
        children: [
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
                    lazy: () => import("~domains/cabinet/pages/ProfilePage"),
                    handle: {
                      title: () => <Trans i18nKey={"account.profile.title"} />,
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
                lazy: () => import("~domains/cabinet/pages/UpdatePasswordPage"),
                handle: {
                  title: () => (
                    <Trans i18nKey={"account.changePassword.title"} />
                  ),
                },
              },
              {
                path: "saved-addresses",
                lazy: () => import("~domains/cabinet/pages/SavedAddressesPage"),
                handle: {
                  title: () => <Trans i18nKey={"account.addresses.title"} />,
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
          {
            path: "refund",
            lazy: () => import("~domains/payment/pages/RefundPage"),
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
