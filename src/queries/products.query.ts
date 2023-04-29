import { menuApi } from "~api";
import { IGetProductsParams } from "~api/types";
import { QueryOptions } from "react-query";

export const productsQuery = (params: IGetProductsParams): QueryOptions => ({
  queryKey: ["products", "list", params ?? "all"],
  queryFn: () => menuApi.getProducts(params).then((res) => res.data),
});
