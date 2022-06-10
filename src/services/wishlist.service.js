import {client} from "../clients/client";

class Wishlist {
    getItems(params = {}) {
        return client.get('wishlist/items', {
            params
        });
    }
}

const WishlistService = new Wishlist();

export default WishlistService;