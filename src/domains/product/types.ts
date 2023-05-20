import {
  IGetCategoriesRes,
  IGetProductsRes,
  IGetWishlistRes,
} from "~api/types";

export type CategoryPageLoaderData = {
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
  categories: IGetCategoriesRes;
  q: string | undefined;
  sort: string | undefined;
};

export type UpdateCartProductFormDataPayload = {
  product_id: string;
  quantity: string;
  count: string;
  variant_id?: string;
  cart_product_id?: string;
  price: string;
};

export type DeleteCartProductFormDataPayload = {
  cart_product_id: string;
};
