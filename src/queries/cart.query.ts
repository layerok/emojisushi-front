import { QueryOptions } from "react-query";
import { cartApi } from "~api";

export const cartQuery: QueryOptions = {
  queryKey: ["cart"],
  queryFn: () => cartApi.getProducts().then((res) => res.data),
};
