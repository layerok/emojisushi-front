import { client } from "~clients/client";
import { ICartProduct, IGetCartRes } from "./cart.api.types";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

const getCartProducts = (params = {}) => {
  return client
    .get<IGetCartRes>("cart/products", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig)
    .then((res) => res.data);
};

function addCartProduct(params = {}) {
  return client.get<{
    data: ICartProduct[];
    total: string;
    totalQuantity: number;
  }>("cart/add", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function removeCartProduct(cart_product_id) {
  return client.get<{
    data: ICartProduct[];
    total: string;
    totalQuantity: number;
  }>("cart/remove", {
    params: {
      cart_product_id,
    },
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function clearCart(params = {}) {
  return client.get<{
    data: ICartProduct[];
    total: string;
    totalQuantity: number;
  }>("cart/clear", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

export const cartApi = {
  getProducts: getCartProducts,
  addProduct: addCartProduct,
  removeCartProduct,
  clearCart,
};
