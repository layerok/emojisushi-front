import CartApi from "~api/cart.api";
import { queryClient } from "~query-client";
import { cartQuery } from "../CartPage/CartPage";

export const cartUpdateAction = async ({ params, request }) => {
  let formData = await request.formData();
  const product_id = formData.get("product_id");
  const variant_id = formData.get("variant_id");
  const quantity = formData.get("quantity");

  await CartApi.addProduct({
    product_id,
    quantity,
    variant_id,
  });

  queryClient.invalidateQueries(cartQuery.queryKey);
  return null;
};
