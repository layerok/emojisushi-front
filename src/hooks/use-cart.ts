import { useQuery } from "react-query";
import { CartProduct } from "~models";
import { cartQuery } from "~routes";

export const useCart = () => {
  // todo add return types
  const query = useQuery(cartQuery) as any;
  return query?.data?.data;
};

export const useCartProducts = () => {
  const resp = useCart();

  return resp?.data.map((json) => new CartProduct(json));
};
