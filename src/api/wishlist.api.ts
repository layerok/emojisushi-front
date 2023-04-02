import { AxiosResponse } from "axios";
import { client } from "../clients/client";
import { IWishlist } from "./wishlist.api.types";

class Wishlist {
  addItem(params: { product_id: number; quantity?: number | null }) {
    return client.get("wishlist/add", {
      params,
    });
  }

  getList(): Promise<AxiosResponse<IWishlist[]>> {
    return client.get("wishlist/list");
  }
}

const WishlistApi = new Wishlist();

export default WishlistApi;
