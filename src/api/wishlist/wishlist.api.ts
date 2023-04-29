import { client } from "~clients/client";
import { IGetWishlistRes } from "./wishlist.api.types";

function addWishlistItem(params: {
  product_id: number;
  quantity?: number | null;
}) {
  return client.get("wishlist/add", {
    params,
  });
}

function getList() {
  return client.get<IGetWishlistRes>("wishlist/list");
}

export const wishlistApi = {
  addItem: addWishlistItem,
  getList,
};
