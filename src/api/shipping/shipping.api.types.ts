import { Nullable } from "../common/common.api.types";

export type ICurrency = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  decimals: number;
};

export type IPrice = {
  id: number;
  price: number;
  price_formatted: string;
  currency: ICurrency;
  category: Nullable<{
    sort_order: number;
    code: string;
  }>;
};

export type IShippingMethod = {
  id: number;
  name: string;
  description: string;
  sort_order: number;
  guaranteed_delivery_days: null | number;
  price_includes_tax: boolean;
  code: string;
  price_formatted: string | null;
  prices: IPrice[];
};

export type IGetShippingMethodsRes = {
  data: IShippingMethod[];
  meta: {
    total: number;
  };
};

export enum ShippingMethodIdEnum {
  Takeaway = 1,
  Courier = 2,
}

export enum ShippingMethodCodeEnum {
  Takeaway = "takeaway",
  Courier = "courier",
}

export enum PaymentMethodCodeEnum {
  Cash = "cash",
}
