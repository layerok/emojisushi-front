import {Routes, Route, Navigate } from "react-router-dom";
import * as React from "react";
import 'normalize.css';
import {theme} from "~theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "./pages/ThankYou";
import {Delivery} from "./pages/Delivery"
import {Checkout} from "./pages/Checkout";
import {Category} from "./pages/Category";
import { observer} from "mobx-react";
import {Wishlist} from "./pages/Wishlist";
import {Profile} from "./pages/Profile";
import {UpdatePassword} from "./pages/UpdatePassword";
import {SavedAddresses} from "./pages/SavedAddresses";
import {MyOrders} from "./pages/ MyOrders";
import {ResetPassword} from "./pages/ResetPassword";
import {useAuthStore} from "~hooks/use-auth-store";
import {ProtectedRoute} from "~components/ProtectedRoute";



export const App = observer(() => {

  const authStore = useAuthStore();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          {/*                    <Route path="/" element={<Home />} />*/}
          <Route path="/category/:categorySlug" element={<Category />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/dostavka-i-oplata" element={<Delivery />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />

          <Route element={<ProtectedRoute redirectPath={'/categori/roli'} user={authStore.user}/>}>
            <Route path="/account/profile" element={<Profile/>}/>
            <Route path="/account/recover-password" element={<UpdatePassword/>} />
            <Route path="/account/saved-addresses" element={<SavedAddresses/>} />
            <Route path="/account/orders" element={<MyOrders/>} />
            <Route path="/account" element={<Navigate to={"/account/profile"}/>}/>
          </Route>

          <Route path="/reset-password" >
            <Route path=":code" element={<ResetPassword/>}/>
            <Route path="" element={<ResetPassword/>}/>
          </Route>
          <Route path="*" element={<Navigate to={"/category/roli"}/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
})

