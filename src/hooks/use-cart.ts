import { useQuery } from "@tanstack/react-query";
import { cartQuery } from "~queries/cart.query";

export const useCart = () => {
  // todo add return types
  const query = useQuery(cartQuery) as any;
  return query?.data;
};
