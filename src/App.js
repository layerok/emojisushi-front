import {Routes, Route, Navigate } from "react-router-dom";
import React, {useEffect} from "react";
import 'normalize.css';
import {theme} from "./theme";
import {ThemeProvider} from "styled-components";
import {ThankYou} from "./pages/ThankYou";
import {Delivery} from "./pages/Delivery"
import {Checkout} from "./pages/Checkout";
import {Category} from "./pages/Category";
import {inject, observer} from "mobx-react";
import {Wishlist} from "./pages/Wishlist";
import {reaction} from "mobx";
import LocalStorageService from "./services/local-storage.service";
import {Profile} from "./pages/Profile";
import {RecoverPassword} from "./pages/RecoverPassword";
import {SavedAddresses} from "./pages/SavedAddresses";
import {MyOrders} from "./pages/ MyOrders";
import {productsService} from "./services/products.service";
import {categoriesService} from "./services/categories.service";
import {spotsService} from "./services/spots.service";
import {cartService} from "./services/cart.service";

function App(
    {
        SpotsStore,
        CartStore,
        AppStore,
        ProductsStore
    }
) {

    useEffect(() => {
        spotsService.fetchItems();
    }, [])

    useEffect(() => {
        return reaction(() => {
            return SpotsStore.needRefresh
        }, () => {
            const selected = SpotsStore.getSelected;
            LocalStorageService.set('spot_id', selected.id);
            cartService.clearCart().then(() => {
                AppStore.setLoading(false);
            }).catch(() => {
                AppStore.setLoading(false);
            });
            productsService.fetchItems(ProductsStore.lastParams);
            categoriesService.fetchItems()
        })
    }, [])


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
                    <Route path="/account/profile" element={<Profile/>}/>
                    <Route path="/account/recover-password" element={<RecoverPassword/>} />
                    <Route path="/account/saved-addresses" element={<SavedAddresses/>} />
                    <Route path="/account/orders" element={<MyOrders/>} />
                    <Route path="*" element={<Navigate to={"/category/roli"}/>} replace/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default inject('SpotsStore', 'CartStore', 'AppStore', 'CategoriesStore', 'ProductsStore')(observer(App))
