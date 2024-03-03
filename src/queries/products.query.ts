import { menuApi } from "~api";
import { IGetProductsParams, IGetProductsRes } from "~api/types";
import { QueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const productsQueryKeys = {
  def: ["products"],
  lists: () => [...productsQueryKeys.def, "list"],
  list: (params?: IGetProductsParams) => [
    ...productsQueryKeys.lists(),
    params ?? "all",
  ],
};

export const productsQuery = (
  params: IGetProductsParams = {}
): QueryOptions<IGetProductsRes> => ({
  queryKey: productsQueryKeys.list(params),
  queryFn: async ({ signal }) => {
    try {
      const res = await menuApi.getProducts(params, signal);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response.status === 404) {
          return {
            data: [],
            total: 0,
            sort_options: [],
            filters: [],
          };
        }
        throw e;
      }
    }
  },
});
