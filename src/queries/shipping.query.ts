import { QueryOptions } from "react-query";
import { shippingApi } from "~api";

export const shippingQuery: QueryOptions = {
  queryFn: () => shippingApi.getMethods().then((res) => res.data),
  queryKey: ["shipping", "list", "all"],
};
