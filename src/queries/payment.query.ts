import { QueryOptions } from "react-query";
import PaymentApi from "~api/payment.api";

export const paymentQuery: QueryOptions = {
  queryFn: () => PaymentApi.getMethods().then((res) => res.data),
  queryKey: ["payment", "list", "all"],
};
