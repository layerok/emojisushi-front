import { QueryOptions } from "react-query";
import ShippingApi from "~api/shipping.api";

export const shippingQuery: QueryOptions = {
  queryFn: () => ShippingApi.getMethods().then((res) => res.data),
  queryKey: ["shipping", "list", "all"],
};
