import {IProduct} from "~api/menu.api.types";

export type ICartProduct = {
  quantity: number;
  product: IProduct;
  id: number;
}
