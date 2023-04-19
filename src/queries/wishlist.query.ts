import { wishlistApi } from "~api";
import { QueryOptions } from "react-query";

export const wishlistsQuery: QueryOptions = {
  queryKey: ["wishlists", "list", "all"],
  queryFn: () => {
    return wishlistApi.getList().then((res) => res.data);
  },
};
