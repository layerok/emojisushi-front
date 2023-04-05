import { QueryOptions } from "react-query";
import CartApi from "~api/cart.api";

export const cartQuery: QueryOptions = {
  queryKey: ["cart"],
  queryFn: () => CartApi.getProducts().then((res) => res.data),
};
