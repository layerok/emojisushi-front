import { QueryOptions } from "react-query";
import { shippingApi } from "~api";
import { IGetShippingMethodsRes } from "~api/types";

export const shippingQuery: QueryOptions<IGetShippingMethodsRes> = {
  queryFn: () => shippingApi.getMethods().then((res) => res.data),
  queryKey: ["shipping", "list", "all"],
};
