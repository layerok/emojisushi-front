import { defer } from "react-router-dom";
import { cartQuery } from "~queries/cart.query";
import { queryClient } from "~query-client";

export const loader = () => {
  return defer({
    cartQuery:
      queryClient.getQueryData(cartQuery.queryKey) ??
      queryClient.fetchQuery(cartQuery),
  });
};

export const cartPageLoader = loader;
