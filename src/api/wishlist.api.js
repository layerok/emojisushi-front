import {client} from "../clients/client";

class Wishlist {
    addItem(params = {}) {
        return client.get('wishlist/add', {
            params
        });
    }
}

const WishlistApi = new Wishlist();

export default WishlistApi;