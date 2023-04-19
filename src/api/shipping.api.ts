import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IShippingMethod } from "~api/shipping.api.types";

export type IGetShippingMethodsResponse = {
  data: IShippingMethod[];
  meta: {
    total: number;
  };
};

export const shippingApi = {
  getMethods(params = {}): Promise<AxiosResponse<IGetShippingMethodsResponse>> {
    return client.get("shipping", {
      params,
    });
  },
};
