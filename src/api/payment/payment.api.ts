import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IGetPaymentMethodsRes } from "./payment.api.types";

const getPaymentMethods = (
  params = {}
): Promise<AxiosResponse<IGetPaymentMethodsRes>> => {
  return client.get("payments", {
    params,
  });
};

export const paymentApi = {
  getMethods: getPaymentMethods,
};
