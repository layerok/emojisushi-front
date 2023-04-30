import { IGetCartRes } from "~api/types";
import { Product } from "~models";

export type TProductCardProps = {
  product?: Product;
  loading?: boolean;
  cart?: IGetCartRes;
};
