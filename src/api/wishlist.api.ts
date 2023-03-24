import { client } from "../clients/client";

class Wishlist {
  addItem(params: { product_id: number; quantity?: number | null }) {
    return client.get("wishlist/add", {
      params,
    });
  }
}

const WishlistApi = new Wishlist();

export default WishlistApi;
