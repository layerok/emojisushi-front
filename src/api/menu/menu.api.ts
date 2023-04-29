import { client } from "~clients/client";
import {
  IGetCategoriesParams,
  IGetCategoriesRes,
  IGetProductsParams,
  IGetProductsRes,
} from "./menu.api.types";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

function getProducts(params: IGetProductsParams = {}) {
  return client.get<IGetProductsRes>("products", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function getCategories(params: IGetCategoriesParams = {}) {
  return client.get<IGetCategoriesRes>("categories", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function getIngredients(params = {}) {
  return client.get("ingredients", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

export const menuApi = {
  getProducts,
  getCategories,
  getIngredients,
};
