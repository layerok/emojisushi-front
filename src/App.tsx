import {
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import * as React from "react";
import "normalize.css";
import { theme } from "~theme";
import { ThemeProvider } from "styled-components";
import { ThankYou } from "~pages/ThankYou";
import { Delivery } from "~pages/Delivery";
import { Checkout } from "~pages/Checkout";
import { Category } from "~pages/Category";
import { observer } from "mobx-react";
import { Wishlist } from "~pages/Wishlist";
import { Profile } from "~pages/Profile";
import { UpdatePassword } from "~pages/UpdatePassword";
import { SavedAddresses } from "~pages/SavedAddresses";
import { MyOrders } from "~pages/MyOrders";
import { ResetPassword } from "~pages/ResetPassword";
import { ProtectedRoute } from "~components/ProtectedRoute";
import { SelectSpot } from "~pages/SelectSpot";
import { SelectCity } from "~pages/SelectCity";
import { useSpot } from "~hooks/use-spot";
import LocalStorageService from "~services/local-storage.service";
import { rootStore } from "~stores/stores";
import { useCity } from "~hooks/use-city";
const { CitiesStore, CartStore, SpotsStore } = rootStore;

export const EnsureLocation = ({
  redirectPath = "/",
  children,
}: {
  children?: React.ReactNode;
  redirectPath?: string;
}): any => {
  const spot = useSpot();
  const city = useCity();
  const location = useLocation();

  if (!city && location.pathname !== redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!spot && city && location.pathname !== redirectPath + city.slug) {
    return <Navigate to={redirectPath + city.slug} replace />;
  }

  return children ? children : <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <EnsureLocation />,
    loader: async () => {
      await CitiesStore.loadItems(true);
      await SpotsStore.loadItems();

      const onCitiesLoad = () => {
        const selectedId = LocalStorageService.get("city_id");
        const exist = CitiesStore.items.find((item) => item.id === selectedId);
        if (!selectedId || !exist) {
          CitiesStore.select(CitiesStore.items[0]);
        } else {
          CitiesStore.select(exist);
        }
      };

      const onSpotsLoad = () => {
        const selectedId = LocalStorageService.get("spot_id");
        const exist = SpotsStore.items.find((item) => item.id === selectedId);
        if (!selectedId || !exist) {
          SpotsStore.select(SpotsStore.items[0], () => CartStore.fetchItems());
        } else {
          SpotsStore.select(exist, () => CartStore.fetchItems());
        }
      };

      onCitiesLoad();
      onSpotsLoad();

      return {
        cities: CitiesStore.items,
        spots: SpotsStore.items
      }
    },
    children: [
      {
        index: true,
        element: <SelectCity />,

      },
      {
        path: ":citySlug",
        children: [
          {
            index: true,
            element: <SelectSpot />,
  
          },
          {
            path: ":spotSlug",
            children: [
              {
                index: true,
                element: <Navigate to={"category/roli"} />,
              },
              {
                path: "category",
                children: [
                  {
                    path: ":categorySlug",
                    element: <Category />,
                  },
                ],
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
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export const App = observer(() => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
});
