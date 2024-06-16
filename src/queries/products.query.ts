import { menuApi } from "~api";
import {
  ClientProduct,
  IGetProductsParams,
  IGetProductsRes,
  IProduct,
} from "~api/types";
import { QueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import levenshtein from "js-levenshtein";

export const productsQueryKeys = {
  def: ["products"],
  lists: () => [...productsQueryKeys.def, "list"],
  list: (params?: IGetProductsParams) => [
    ...productsQueryKeys.lists(),
    params ?? "all",
  ],
};

export const fuzzySearch = (
  products: IProduct[],
  search?: string,
  maxAllowedModifications: number = 2
): IProduct[] => {
  if (!search) {
    return products;
  }
  const computeBestScore = (product: IProduct): ClientProduct => {
    const words = product.name.split(" ");
    const searchWords = search.split(" ");

    let bestScore = 1000;

    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < searchWords.length; j++) {
        const score = levenshtein(searchWords[j], words[i]);
        if (bestScore > score) {
          bestScore = score;
        }
      }
    }

    return { ...product, best_score: bestScore };
  };

  return products
    .map(computeBestScore)
    .filter((product) => product.best_score <= maxAllowedModifications)
    .sort((a, b) => a.best_score - b.best_score);
};

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
