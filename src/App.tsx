import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import * as React from "react";
import 'normalize.css';
import {theme} from "~theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "~pages/ThankYou";
import {Delivery} from "~pages/Delivery"
import {Checkout} from "~pages/Checkout";
import {Category} from "~pages/Category";
import { observer} from "mobx-react";
import {Wishlist} from "~pages/Wishlist";
import {Profile} from "~pages/Profile";
import {UpdatePassword} from "~pages/UpdatePassword";
import {SavedAddresses} from "~pages/SavedAddresses";
import {MyOrders} from "~pages/ MyOrders";
import {ResetPassword} from "~pages/ResetPassword";
import {useAuthStore} from "~hooks/use-auth-store";
import {ProtectedRoute} from "~components/ProtectedRoute";
import {Layout} from "~layout/Layout";
import {Home} from "~pages/Home";
import {useSpot} from "~hooks/use-spot";
import {useEffect} from "react";
import {useCartStore} from "~hooks/use-cart-store";
import {useProductsStore} from "~hooks/use-categories-store";
import {useCategoriesStore} from "~hooks/use-products-store";
import {SpotsStore} from "~stores/spots.store";
import {useSpotsStore} from "~hooks/use-spots-store";

const LoadUserPage = () => {
  return <Layout loading={true}>

  </Layout>
}
export const LocationRoute = ({redirectPath = '/', children}: {
  children?: React.ReactNode;
  redirectPath?: string;
}): any => {
  const spot = useSpot();
  const CartStore = useCartStore();
  const ProductsStore = useProductsStore();
  const CategoriesStore = useCategoriesStore();
  const SpotsStore = useSpotsStore();

  useEffect(() => {
    if(spot) {

      SpotsStore.select(spot, () => {
        CartStore.fetchItems();
        ProductsStore.fetchItems(ProductsStore.lastParams);
        CategoriesStore.fetchItems();
      });
    }
  }, [spot, CategoriesStore, ProductsStore, CartStore, SpotsStore])

  if (!spot) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet/>;
};

export const App = observer(() => {

  const authStore = useAuthStore();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          {authStore.checkUser ? (
            <>
              <Route path="/" element={<Home/>}/>
              <Route element={<LocationRoute redirectPath={'/'} />}>
                <Route path={":spotSlug"}>
                  <Route path="category/:categorySlug" element={<Category />}/>
                  <Route path="thankyou" element={<ThankYou />} />
                  <Route path="dostavka-i-oplata" element={<Delivery />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="wishlist" element={<Wishlist />} />

                  <Route element={<ProtectedRoute redirectPath={'/'} user={authStore.user}/>}>
                    <Route path="account/profile" element={<Profile/>}/>
                    <Route path="account/recover-password" element={<UpdatePassword/>} />
                    <Route path="account/saved-addresses" element={<SavedAddresses/>} />
                    <Route path="account/orders" element={<MyOrders/>} />
                    <Route path="account" element={<Navigate to={"/account/profile"}/>}/>
                  </Route>

                  <Route path="reset-password" >
                    <Route path=":code" element={<ResetPassword/>}/>
                    <Route path="" element={<ResetPassword/>}/>
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to={"/"}/>}/>
              </Route>
            </>
          ): (
            <>
              <Route path="*" element={<LoadUserPage/>}/>
            </>
          )}

        </Routes>
      </div>
    </ThemeProvider>
  );
})

