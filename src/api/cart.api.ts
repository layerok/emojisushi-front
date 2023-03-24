import { client } from "~clients/client";

class Cart {
  getProducts(params = {}) {
    return client.get("cart/products", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  addProduct(params = {}) {
    return client.get("cart/add", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  removeCartProduct(cart_product_id) {
    return client.get("cart/remove", {
      params: {
        cart_product_id,
      },
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  clearCart(params = {}) {
    return client.get("cart/clear", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }
}

const CartApi = new Cart();

export default CartApi;
