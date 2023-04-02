import { QueryOptions } from "react-query";
import { defer } from "react-router-dom";
import CartApi from "~api/cart.api";
import { queryClient } from "~query-client";

export const cartQuery: QueryOptions = {
  queryKey: ["cart"],
  queryFn: () => CartApi.getProducts(),
};
export const loader = () => {
  return defer({
    cartQuery:
      queryClient.getQueryData(cartQuery.queryKey) ??
      queryClient.fetchQuery(cartQuery),
  });
};

export const cartPageLoader = loader;
