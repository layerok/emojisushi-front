import {Routes, Route, Navigate } from "react-router-dom";
import React, {useEffect} from "react";
import {Home} from "./pages/Home";
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
import CartService from "./services/cart.service";
import {SpotsModal} from "./components/modals/SpotsModal";

function App(
    {
        SpotsStore,
        CartStore,
        AppStore,
        ProductsStore,
        CategoriesStore
    }
) {

    useEffect(() => {
        SpotsStore.fetchItems();
    }, [])

    useEffect(() => {
        return reaction(() => {
            return SpotsStore.needRefresh
        }, () => {
            const selected = SpotsStore.getSelected;
            LocalStorageService.set('spot_id', selected.id);
            CartService.clearCart().then((res) => {
                CartStore.setItems(res.data.data);
                CartStore.setTotal(res.data.total);
                CartStore.setTotalQuantity(res.data.totalQuantity)
                AppStore.setLoading(false);
            }).catch(() => {
                AppStore.setLoading(false);
            });

            ProductsStore.fetchItems(ProductsStore.lastParams);
            CategoriesStore.fetchItems()
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
                    <Route path="*" element={<Navigate to={"/category/roli"}/>} replace/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default inject('SpotsStore', 'CartStore', 'AppStore', 'CategoriesStore', 'ProductsStore')(observer(App))
