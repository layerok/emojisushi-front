import {
  IGetCategoriesRes,
  IGetProductsRes,
  IGetWishlistRes,
} from "~api/types";

export type WishlistPageLoaderData = {
  products: IGetProductsRes;
  wishlists: IGetWishlistRes;
  categories: IGetCategoriesRes;
  q: string | undefined;
};
