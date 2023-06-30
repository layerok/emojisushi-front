import { wishlistApi } from "~api";
import { QueryOptions } from "react-query";
import { IGetWishlistRes } from "~api/types";

export const wishlistsQuery: QueryOptions<IGetWishlistRes> = {
  queryKey: ["wishlists", "list", "all"],
  queryFn: () => {
    return wishlistApi.getList().then((res) => res.data);
  },
};
