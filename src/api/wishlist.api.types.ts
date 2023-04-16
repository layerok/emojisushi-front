import { IShippingMethod } from "./shipping.api.types";

export type IWishlistItem = {
  id: number;
  wishlist_id: number;
  product_id: number;
  variant_id: null | number;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export type IWishlist = {
  id: number;
  name: string;
  session_id: string;
  customer_id: null | number;
  created_at: string;
  updated_at: string;
  shipping_method_id: null | number;
  spot_id: null | number; // todo: remove this field from database, we don't need it anymore, session already knows about right spot_id
  items: IWishlistItem[];
  shipping_method: null | IShippingMethod;
};

export type IGetWishlistResponse = IWishlist[];
