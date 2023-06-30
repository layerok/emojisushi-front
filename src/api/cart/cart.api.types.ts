import { IProduct, IVariant } from "../menu/menu.api.types";

export type ICartProduct = {
  quantity: number;
  product: IProduct;
  id: number;
  variant?: IVariant;
  product_id: number;
  variant_id?: number;
  price: Record<string, number>;
  price_formatted: null | string;
};

export type IGetCartRes = {
  data: ICartProduct[];
  total: string;
  totalQuantity: number;
};
