import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import {
  IGetCategoriesParams,
  IGetCategoriesResponse,
  IGetProductsParams,
  IGetProductsResponse,
} from "~api/menu.api.types";

export const menuApi = {
  getProducts(
    params: IGetProductsParams = {}
  ): Promise<AxiosResponse<IGetProductsResponse>> {
    return client.get("products", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  },
  getCategories(
    params: IGetCategoriesParams = {}
  ): Promise<AxiosResponse<IGetCategoriesResponse>> {
    return client.get("categories", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  },

  getIngredients(params = {}) {
    return client.get("ingredients", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  },
};
