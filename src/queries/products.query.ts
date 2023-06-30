import { menuApi } from "~api";
import { IGetProductsParams, IGetProductsRes } from "~api/types";
import { QueryOptions } from "@tanstack/react-query";

export const productsQuery = (
  params: IGetProductsParams
): QueryOptions<IGetProductsRes> => ({
  queryKey: ["products", "list", params ?? "all"],
  queryFn: () => menuApi.getProducts(params).then((res) => res.data),
});
