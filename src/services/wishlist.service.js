import {client} from "../clients/client";

class Wishlist {
    addItem(params = {}) {
        return client.get('wishlist/add', {
            params
        });
    }
}

const WishlistService = new Wishlist();

export default WishlistService;