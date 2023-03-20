import {
  Navigate,
} from "react-router-dom";
import "normalize.css";
import { ThankYou } from "~pages/ThankYou";
import { Delivery } from "~pages/Delivery";
import { Checkout } from "~pages/Checkout";
import { Category } from "~pages/Category";
import { Wishlist } from "~pages/Wishlist";
import { Profile } from "~pages/Profile";
import { UpdatePassword } from "~pages/UpdatePassword";
import { SavedAddresses } from "~pages/SavedAddresses";
import { MyOrders } from "~pages/MyOrders";
import { ResetPassword } from "~pages/ResetPassword";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { SelectLocation } from "~pages/SelectLocation";
import { rootStore } from "~stores/stores";
import { toJS } from "mobx";
import { EnsureLocation } from "~components/EnsureLocation";
const { CitiesStore, ProductsStore, CategoriesStore } = rootStore;

export const routes = [
  {
    path: "/",
    element: <EnsureLocation />,
    loader: async () => {
      await CitiesStore.loadItems(true);

      return toJS(CitiesStore.items);
    },
    children: [
      {
        index: true,
        element: <SelectLocation />,
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
            element: <Category />,
            loader: async ({ params }) => {
              await ProductsStore.fetchItems({
                category_slug: params.categorySlug,
                limit: ProductsStore.step,
              });

              await CategoriesStore.fetchItems();

              return {
                products: toJS(ProductsStore.items),
                categories: toJS(CategoriesStore.items),
              };
            },
          },
          {
            path: "thankyou",
            element: <ThankYou />,
          },
          {
            path: "dostavka-i-oplata",
            element: <Delivery />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
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
                element: <Profile />,
              },
              {
                path: "account/recover-password",
                element: <UpdatePassword />,
              },
              {
                path: "account/saved-addresses",
                element: <SavedAddresses />,
              },
              {
                path: "account/orders",
                element: <MyOrders />,
              },
            ],
          },
          {
            path: "reset-password",
            children: [
              {
                index: true,
                element: <ResetPassword />,
              },
              {
                path: ":code",
                element: <ResetPassword />,
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
