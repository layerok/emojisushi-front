import { QueryOptions } from "react-query";
import { paymentApi } from "~api";

export const paymentQuery: QueryOptions = {
  queryFn: () => paymentApi.getMethods().then((res) => res.data),
  queryKey: ["payment", "list", "all"],
};
