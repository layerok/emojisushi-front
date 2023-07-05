import { menuApi } from "~api";
import { IGetProductsParams, IGetProductsRes } from "~api/types";
import { QueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const productsQuery = (
  params: IGetProductsParams
): QueryOptions<IGetProductsRes> => ({
  queryKey: ["products", "list", params ?? "all"],
  queryFn: async () => {
    try {
      const res = await menuApi.getProducts(params);
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
