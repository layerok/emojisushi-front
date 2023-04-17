import { AxiosResponse } from "axios";
import { client } from "~clients/client";
import { ICartProduct } from "./cart.api.types";

// todo: rename to IGetCartResponse
export type IGetCartProductsResponse = {
  data: ICartProduct[];
  total: string;
  totalQuantity: number;
};

class Cart {
  getProducts(params = {}): Promise<AxiosResponse<IGetCartProductsResponse>> {
    return client.get("cart/products", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  addProduct(params = {}): Promise<
    AxiosResponse<{
      data: ICartProduct[];
      total: string;
      totalQuantity: number;
    }>
  > {
    return client.get("cart/add", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  removeCartProduct(cart_product_id): Promise<
    AxiosResponse<{
      data: ICartProduct[];
      total: string;
      totalQuantity: number;
    }>
  > {
    return client.get("cart/remove", {
      params: {
        cart_product_id,
      },
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  clearCart(params = {}): Promise<
    AxiosResponse<{
      data: ICartProduct[];
      total: string;
      totalQuantity: number;
    }>
  > {
    return client.get("cart/clear", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }
}

const CartApi = new Cart();

export default CartApi;
