import {stores} from "../stores/stores";
import WishlistApi from "../api/wishlist.api";
const { WishlistStore } = stores;

class WishlistService {
    addItem = (params = {}) => {
        const {product_id} = params;
        WishlistStore.setLoading(true);
        WishlistStore.setPending([...WishlistStore.pending, product_id])
        return WishlistApi.addItem(params).then((res) => {
            WishlistStore.setLoading(false);
            WishlistStore.setPending(WishlistStore.pending.filter((p) => p !== product_id));
            return Promise.resolve(res);
        }).catch(() => {
            WishlistStore.setLoading(false);
            WishlistStore.setPending(WishlistStore.pending.filter((p) => p !== product_id));
        });
    }
}


export const wishlistService = new WishlistService();