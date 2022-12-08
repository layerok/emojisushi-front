import {stores} from "../stores/stores";
import CartApi from "../api/cart.api";
const { CartStore } = stores;

class CartService {
    fetchItems() {
        CartStore.setLoading(true);
        return CartApi.getProducts().then(res => {
            CartStore.setItems(res.data.data);
            CartStore.setTotal(res.data.total)
            CartStore.setTotalQuantity(res.data.totalQuantity);
        }).catch(() => {
            CartStore.setLoading(false);
        }).finally(() => {
            CartStore.setLoading(false);
        });
    }

    addProduct(params = {}) {
        const {product_id} = params;

        CartStore.setLoading(true);
        CartStore.setPending([...CartStore.pending, product_id]);
        return CartApi.addProduct(params).then((res) => {
            CartStore.setItems(res.data.data);
            CartStore.setTotal(res.data.total);
            CartStore.setTotalQuantity(res.data.totalQuantity);
        }).finally(() => {
            CartStore.setLoading(false);
            CartStore.setPending(CartStore.pending.filter(id=> id !== product_id));
        }).catch(() => {
            CartStore.setLoading(false);
            CartStore.setPending(CartStore.pending.filter(id=> id !== product_id));
        });
    }

    removeCartProduct(cart_product_id) {
        CartStore.setLoading(true);
        return CartApi.removeCartProduct(cart_product_id).then((res) => {
            CartStore.setItems(res.data.data);
            CartStore.setTotal(res.data.total);
            CartStore.setTotalQuantity(res.data.totalQuantity);
        }).finally(() => {
            CartStore.setLoading(false);
        }).catch(() => {
            CartStore.setLoading(false);
        });
    }

    clearCart() {
        return CartApi.clearCart().then((res) => {
            CartStore.setItems(res.data.data);
            CartStore.setTotal(res.data.total);
            CartStore.setTotalQuantity(res.data.totalQuantity)
        })
    }
}


export const cartService = new CartService();