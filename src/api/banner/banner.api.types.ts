import { IFile } from "~api/common/common.api.types";
import { Product } from "~models";

export type Banner = {
  id: number;
  image: IFile;
  image_small: IFile;
  is_active: boolean;
  product?: Product;
};

export type IGetBannersRes = {
  data: Banner[];
};
