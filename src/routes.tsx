import { Navigate } from "react-router-dom";
import { useBreakpoint } from "~common/hooks";

const Test = () => {
  const breakpoint = useBreakpoint();
  const breakpoint2 = useBreakpoint();
  console.log("rerender Test", breakpoint);
  return <div>test</div>;
};

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
                    lazy: () => import("~domains/product/pages/CategoryPage"),
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
                element: <Navigate to={"/account/profile"} />,
              },
              {
                path: "account/profile",
                lazy: () => import("~domains/cabinet/pages/ProfilePage"),
              },
              {
                path: "account/recover-password",
                lazy: () => import("~domains/cabinet/pages/UpdatePasswordPage"),
              },
              {
                path: "account/saved-addresses",
                lazy: () => import("~domains/cabinet/pages/SavedAddressesPage"),
              },
              {
                path: "account/orders",
                lazy: () => import("~domains/cabinet/pages/MyOrdersPage"),
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
    path: "/test",
    element: <Test />,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
