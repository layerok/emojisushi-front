import CartApi from "~api/cart.api";
import { cartQuery } from "../CartPage/CartPage";
import { queryClient } from "~query-client";

export const cartDeleteAction = async ({ params, request }) => {
  let formData = await request.formData();
  const cart_product_id = formData.get("cart_product_id");

  await CartApi.removeCartProduct(cart_product_id);

  queryClient.invalidateQueries(cartQuery.queryKey);
  return null;
};
