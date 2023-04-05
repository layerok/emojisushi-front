import CartApi from "~api/cart.api";
import { cartQuery } from "~queries";
import { queryClient } from "~query-client";

export const cartDeleteAction = async ({ params, request }) => {
  let formData = await request.formData();
  const cart_product_id = formData.get("cart_product_id");

  const res = await CartApi.removeCartProduct(cart_product_id);

  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};
