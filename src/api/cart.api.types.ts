import { IProduct, IVariant } from "~api/menu.api.types";

export type ICartProduct = {
  quantity: number;
  product: IProduct;
  id: number;
  variant?: IVariant;

  product_id: number;

  variant_id?: number;
};
