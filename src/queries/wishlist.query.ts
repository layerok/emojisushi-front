import WishlistApi from "~api/wishlist.api";
import { QueryOptions } from "react-query";

export const wishlistsQuery: QueryOptions = {
  queryKey: ["wishlists", "list", "all"],
  queryFn: () => {
    return WishlistApi.getList().then((res) => res.data);
  },
};
