import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IShippingMethod } from "~api/shipping.api.types";

export type IGetShippingMethodsResponse = {
  data: IShippingMethod[];
  meta: {
    total: number;
  };
};

class Shipping {
  getMethods(params = {}): Promise<AxiosResponse<IGetShippingMethodsResponse>> {
    return client.get("shipping", {
      params,
    });
  }
}

const ShippingApi = new Shipping();

export default ShippingApi;
