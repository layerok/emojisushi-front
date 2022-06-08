import {client} from "../clients/client";

class Cart {
    getProducts(params = {}) {
        return client.get('cart/products', {
            params
        });
    }

    addProduct(params = {}) {
        return client.get('cart/add', {
            params
        })
    }
}

const CartService = new Cart();

export default CartService;