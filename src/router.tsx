import { QueryOptions } from "@tanstack/react-query";
import { Trans } from "react-i18next";
import {
  createBrowserRouter,
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
import { ROUTES } from "~routes";
import { CitySlug } from "~common/constants";
import { lazy } from "~lazy";

const RootIndexElement = () => {
  const loaderData = useLoaderData() as Awaited<
    ReturnType<typeof rootIndexLoader>
  >;
  return (
    <Navigate
      to={ROUTES.CATEGORY.SHOW.buildPath({
        categorySlug: loaderData.categories.data[0].slug,
      })}
    />
  );
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
  const allowed = [CitySlug.Odesa, CitySlug.Chornomorsk] as string[];
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

const routes = [
  {
    path: ROUTES.INDEX.path,
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
        lazy: lazy(() => import("~layout/Layout")),
        children: [
          {
            element: <Outlet />,
            ErrorBoundary: DefaultErrorBoundary,
            children: [
              {
                path: ROUTES.CATEGORY.path,
                id: "categories",
                children: [
                  {
                    index: true,
                    lazy: lazy(
                      () => import("~domains/category/pages/SelectCategoryPage")
                    ),
                  },
                  {
                    path: ROUTES.CATEGORY.SHOW.path,
                    lazy: lazy(
                      () => import("~domains/product/pages/ProductPage")
                    ),
                    id: "category",
                  },
                ],
              },
              {
                path: ROUTES.THANKYOU.path,
                lazy: lazy(() => import("~domains/order/pages/ThankYouPage")),
              },
              {
                path: ROUTES.DELIVERYANDPAYMENT.path,
                lazy: lazy(() => import("~domains/spot/pages/DeliveryPage")),
              },
              {
                path: ROUTES.CHECKOUT.path,
                lazy: lazy(() => import("~domains/order/pages/CheckoutPage")),
              },
              {
                id: "wishlist",
                path: ROUTES.WISHLIST.path,
                lazy: lazy(
                  () => import("~domains/wishlist/pages/WishlistPage")
                ),
              },

              {
                path: ROUTES.ACCOUNT.path,
                lazy: lazy(() => import("~layout/CabinetLayout")),
                children: [
                  {
                    index: true,
                    element: <Navigate to={ROUTES.ACCOUNT.PROFILE.path} />,
                  },
                  {
                    path: ROUTES.ACCOUNT.PROFILE.path,
                    children: [
                      {
                        index: true,
                        lazy: lazy(
                          () => import("~domains/cabinet/pages/ProfilePage")
                        ),
                        handle: {
                          title: () => (
                            <Trans i18nKey={"account.profile.title"} />
                          ),
                        },
                      },
                      {
                        path: ROUTES.ACCOUNT.PROFILE.EDIT.path,
                        lazy: lazy(
                          () => import("~domains/cabinet/pages/EditProfilePage")
                        ),
                        handle: {
                          title: () => (
                            <Trans i18nKey={"account.edit-profile.title"} />
                          ),
                        },
                      },
                    ],
                  },
                  {
                    path: ROUTES.ACCOUNT.PASSWORD_RECOVERY.path,
                    lazy: lazy(
                      () => import("~domains/cabinet/pages/UpdatePasswordPage")
                    ),
                    handle: {
                      title: () => (
                        <Trans i18nKey={"account.changePassword.title"} />
                      ),
                    },
                  },
                  {
                    path: ROUTES.ACCOUNT.SAVED_ADDRESSES.path,
                    lazy: lazy(
                      () => import("~domains/cabinet/pages/SavedAddressesPage")
                    ),
                    handle: {
                      title: () => (
                        <Trans i18nKey={"account.addresses.title"} />
                      ),
                    },
                  },
                  {
                    path: ROUTES.ACCOUNT.ORDER.path,
                    lazy: lazy(
                      () => import("~domains/cabinet/pages/MyOrdersPage")
                    ),
                    handle: {
                      title: () => <Trans i18nKey={"account.orders.title"} />,
                    },
                  },
                ],
              },

              {
                path: ROUTES.RESET_PASSWORD.path,
                children: [
                  {
                    index: true,
                    lazy: lazy(
                      () => import("~domains/cabinet/pages/ResetPasswordPage")
                    ),
                  },
                  {
                    path: ROUTES.RESET_PASSWORD.CODE.path,
                    lazy: lazy(
                      () => import("~domains/cabinet/pages/ResetPasswordPage")
                    ),
                  },
                ],
              },
              {
                path: ROUTES.REFUND.path,
                lazy: lazy(() => import("~domains/payment/pages/RefundPage")),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.INDEX.path} />,
  },
];

export const router = createBrowserRouter(routes);
