import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IPaymentMethod } from "~api/payment.api.types";

export type IGetPaymentMethodsResponse = {
  data: IPaymentMethod[];
  meta: {
    total: number;
  };
};

class Payment {
  getMethods(params = {}): Promise<AxiosResponse<IGetPaymentMethodsResponse>> {
    return client.get("payments", {
      params,
    });
  }
}

const PaymentApi = new Payment();

export default PaymentApi;
