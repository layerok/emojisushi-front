import { QueryOptions } from "react-query";
import { cartApi } from "~api";
import { IGetCartRes } from "~api/types";

export const cartQuery: QueryOptions<IGetCartRes> = {
  queryKey: ["cart"],
  queryFn: () => cartApi.getProducts(),
};
