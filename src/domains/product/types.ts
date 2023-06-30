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
