import { IPrice, IShippingMethod } from "../shipping/shipping.api.types";
import { IPaymentMethod } from "../payment/payment.api.types";
import { IProduct } from "../menu/menu.api.types";
import { Nullable } from "../common/common.api.types";

export type IRainLabUser = {
  id: number;
  name: Nullable<string>;
  email: string;
  permissions: Nullable<string>;
  is_activated: boolean;
  activated_at: Nullable<string>;
  last_login: Nullable<string>;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  username: Nullable<string>;
  surname: Nullable<string>;
  deleted_at: Nullable<string>;
  last_seen: Nullable<string>;
  is_guest: 0 | 1;
  is_superuser: 0 | 1;
  created_ip_address: Nullable<string>;
  last_ip_address: Nullable<string>;
};

type IState = {
  id: number;
  name: string;
  code: string;
  country: ICountry;
};

type ICountry = {
  id: number;
  is_enabled: 0 | 1;
  name: string;
  code: string;
  is_pinned: 0 | 1;
  calling_code: string;
};

export type IAddress = {
  id: number;
  name: string;
  lines: string;
  zip: string;
  city: string;
  country: ICountry;
  company: Nullable<string>;
  state_id: Nullable<IState>;
  country_id: number;
  details: Nullable<string>;
};

export type IOrderCurrency = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  decimals: number;
  format: string;
  sort_order: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  rounding: unknown; // todo: check type
};

export type IOrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: Nullable<number>;
  name: string;
  variant_name: Nullable<string>;
  description: Nullable<string>;
  quantity: number;
  price_pre_taxes: number;
  price_taxes: number;
  price_post_taxes: number;
  total_pre_taxes: number;
  total_taxes: number;
  total_post_taxes: number;
  tax_factor: number;
  weight: Nullable<number>;
  width: Nullable<number>;
  length: Nullable<number>;
  height: Nullable<number>;
  total_weight: Nullable<number>;
  stackable: boolean;
  shippable: boolean;
  property_values: Nullable<any[]>; // jsonable
  property_description: Nullable<any[]>; //  jsonable
  service_options: Nullable<any[]>; // jsonable
  custom_field_values: any[]; // jsonable
  brand: Nullable<any[]>;
  taxes: any[]; // jsonable
  item: IProduct & {
    price: IPrice;
  };
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  product: IProduct;
};

enum ORDER_STATES {
  NEW = 1,
  IN_PROGRESS = 2,
  DISPUTED = 3,
  CANCELLED = 4,
  COMPLETE = 5,
}

export type IOrder = {
  id: number;
  session_id: Nullable<string>;
  order_number: Nullable<number>;
  invoice_number: Nullable<string>;
  currency: IOrderCurrency;
  payment_state: string;
  order_state_id: ORDER_STATES;
  shipping_address_same_as_billing: Nullable<boolean>;
  billing_address: Nullable<IAddress>;
  shipping_address: Nullable<IAddress>;
  custom_fields: any[]; //jsonable
  shipping: null | {
    method: IShippingMethod; // todo: extend this type
    preTaxes: number;
    taxes: number;
    total: number;
    appliedDiscount: unknown; // todo: check type
  };
  taxes: any[]; // jsonable
  payment: {
    method: IPaymentMethod;
    preTaxes: number;
    taxes: number;
    total: number;
  };
  discounts: any[]; // jsonable
  payment_method_id: Nullable<number>;
  payment_id: Nullable<string>;
  payment_hash: Nullable<string>;
  total_shipping_pre_taxes: Nullable<number>;
  total_shipping_taxes: Nullable<number>;
  total_shipping_post_taxes: Nullable<number>;
  total_payment_pre_taxes: Nullable<number>;
  total_payment_taxes: Nullable<number>;
  total_payment_post_taxes: Nullable<number>;
  total_product_pre_taxes: Nullable<number>;
  total_product_taxes: Nullable<number>;
  total_product_post_taxes: Nullable<number>;
  total_taxes: Nullable<number>;
  total_pre_payment: Nullable<number>;
  total_pre_taxes: Nullable<number>;
  total_post_taxes: Nullable<number>;
  tracking_number: Nullable<string>;
  tracking_url: Nullable<string>;
  is_virtual: 0 | 1;
  credit_card_last4_digits: Nullable<number>;
  card_holder_name: Nullable<string>;
  card_type: Nullable<string>;
  lang: string;
  total_weight: Nullable<number>;
  customer_notes: Nullable<string>;
  admin_notes: Nullable<string>;
  payment_transaction_id: Nullable<string>;
  ip_address: Nullable<string>;
  customer_id: Nullable<number>;
  paid_at: Nullable<string>;
  delete_at: Nullable<string>;
  updated_at: Nullable<string>;
  shipped_at: Nullable<string>;
  spot_id: Nullable<number>;
  customer_payment_method_id: Nullable<number>;
  products: IOrderProduct[];
  order_state: IOrderState;
};

export type IOrderState = {
  id: number;
  name: string;
  description: string;
  color: string;
  sort_order: number;
  flag: string;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
};

export type ICustomer = {
  firstname: string;
  lastname: string;
  is_guest: boolean;
  default_shipping_address_id: number | null;
  default_billing_address_id: number | null;
  addresses: IAddress[];
  orders: IOrder[];
};

export type IUser = IRainLabUser & {
  offline_mall_customer_group_id: number | null;
  phone: string | null;
  customer: ICustomer | null;
};
