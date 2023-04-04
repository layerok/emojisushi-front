import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import {
  ICategory,
  IFilter,
  IGetCategoriesParams,
  IGetProductsParams,
  IProduct,
} from "~api/menu.api.types";
import { Nullable } from "~common/types";

export type IGetCategoriesResponse = {
  data: ICategory[];
  meta: {
    total: number;
    offset: Nullable<number>;
    limit: Nullable<number>;
  };
};

export type IGetProductsResponse = {
  data: IProduct[];
  total: number;
  sort_options: string[];
  filters: IFilter[];
};

class Menu {
  getProducts(
    params: IGetProductsParams = {}
  ): Promise<AxiosResponse<IGetProductsResponse>> {
    return client.get("products", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }
  getCategories(
    params: IGetCategoriesParams = {}
  ): Promise<AxiosResponse<IGetCategoriesResponse>> {
    return client.get("categories", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }

  getIngredients(params = {}) {
    return client.get("ingredients", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }
}

const MenuApi = new Menu();

export default MenuApi;
