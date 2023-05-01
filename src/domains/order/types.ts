import { IGetPaymentMethodsRes, IGetShippingMethodsRes } from "~api/types";

export type CheckoutPageLoaderData = {
  paymentMethods: IGetPaymentMethodsRes;
  shippingMethods: IGetShippingMethodsRes;
};
