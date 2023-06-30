import { QueryOptions } from "@tanstack/react-query";
import { paymentApi } from "~api";
import { IGetPaymentMethodsRes } from "~api/types";

export const paymentQuery: QueryOptions<IGetPaymentMethodsRes> = {
  queryFn: () => paymentApi.getMethods().then((res) => res.data),
  queryKey: ["payment", "list", "all"],
};
