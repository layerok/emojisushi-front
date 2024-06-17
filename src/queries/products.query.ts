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

export const DEFAULT_PRODUCTS_LIMIT = 9999;

export const PRODUCT_ID_SEARCH_QUERY_PARAM = "product_id";

export const productsQuery = (
  params: IGetProductsParams = {}
): QueryOptions<IGetProductsRes> => {
  const { search, ...restParams } = params;
  return {
    queryKey: productsQueryKeys.list(restParams),
    queryFn: async ({ signal }) => {
      try {
        const res = await menuApi.getProducts(restParams, signal);
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
  };
};
