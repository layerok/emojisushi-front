export type IRainLabUser = {
  id: number;
  name: string | null;
  email: string;
  permissions: string | null;
  is_activated: boolean;
  activated_at: null | string;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
  username: string | null;
  surname: string | null;
  deleted_at: null | string;
  last_seen: string | null;
  is_guest: 0 | 1;
  is_superuser: 0 | 1;
  created_ip_address: null | string;
  last_ip_address: null | string;
}

type State = {
  id: number;
  name: string;
  code: string;
  country: Country;
}

type Country = {
  id: number;
  is_enabled: 0 | 1;
  name: string;
  code: string;
  is_pinned: 0 | 1;
  calling_code: string;
}

export type IAddress = {
  id: number;
  name: string;
  lines: string;
  zip: string;
  city: string;
  country: Country;
  company: string | null;
  state_id: State | null;
  country_id: number;
  details: string | null;
}

export type IOfflineMallCustomer = {
  firstname: string;
  lastname: string;
  is_guest: boolean;
  default_shipping_address_id: number | null;
  default_billing_address_id: number | null;
  addresses: IAddress[]
}

export type IOfflineMallUser = IRainLabUser & {
  offline_mall_customer_group_id: number | null;
  phone: string | null;
  customer: IOfflineMallCustomer | null;
}
