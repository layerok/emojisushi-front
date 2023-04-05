import MenuApi from "~api/menu.api";
import { IGetProductsParams } from "~api/menu.api.types";
import { QueryOptions } from "react-query";

export const productsQuery = (params: IGetProductsParams): QueryOptions => ({
  queryKey: ["products", "list", params ?? "all"],
  queryFn: () => MenuApi.getProducts(params).then((res) => res.data),
});
