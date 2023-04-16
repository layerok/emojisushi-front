import { AxiosResponse } from "axios";
import { client } from "~clients/client";
import { IGetWishlistResponse } from "./wishlist.api.types";

export * from "./wishlist.api.types";

class Wishlist {
  addItem(params: { product_id: number; quantity?: number | null }) {
    return client.get("wishlist/add", {
      params,
    });
  }

  getList(): Promise<AxiosResponse<IGetWishlistResponse>> {
    return client.get("wishlist/list");
  }
}

const WishlistApi = new Wishlist();

export default WishlistApi;
