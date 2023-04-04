import CartApi from "~api/cart.api";
import { queryClient } from "~query-client";
import { cartQuery } from "../CartPage/CartPage";

export const cartUpdateAction = async ({ params, request }) => {
  let formData = await request.formData();
  const product_id = formData.get("product_id");
  const variant_id = formData.get("variant_id");
  const quantity = formData.get("quantity");

  const res = await CartApi.addProduct({
    product_id,
    quantity,
    variant_id,
  });

  queryClient.setQueryData(cartQuery.queryKey, res.data);
  return res.data;
};
