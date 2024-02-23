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

function addCartProduct(data: {
  product_id: number;
  variant_id?: number;
  quantity: number;
}): Promise<IGetCartRes> {
  return client.post("cart/add", data, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function removeCartProduct(cart_product_id): Promise<IGetCartRes> {
  return client.post(
    "cart/remove",
    {
      cart_product_id,
    },
    {
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig
  );
}

function clearCart(data = {}) {
  return client.post<IGetCartRes>("cart/clear", data, {
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

export const cartApi = {
  getProducts: getCartProducts,
  addProduct: addCartProduct,
  removeCartProduct,
  clearCart,
};
