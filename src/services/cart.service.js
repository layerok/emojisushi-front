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

    removeCartProduct(cart_product_id) {
        return client.get('cart/remove', {
            params: {
                cart_product_id
            }
        })
    }

    clearCart(params = {}) {
        return client.get('cart/clear', {
            params
        })
    }
}

const CartService = new Cart();

export default CartService;