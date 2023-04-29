import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IGetShippingMethodsRes } from "./shipping.api.types";

const getShippingMethods = (
  params = {}
): Promise<AxiosResponse<IGetShippingMethodsRes>> => {
  return client.get("shipping", {
    params,
  });
};

export const shippingApi = {
  getMethods: getShippingMethods,
};
