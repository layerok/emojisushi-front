import {makeAutoObservable} from "mobx";
import WishlistService from "../services/wishlist.service";

class Wishlist {

    constructor() {
        makeAutoObservable(this);
    }
    loading = false;
    pending = [];

    setLoading = (state) => {
        this.loading = state;
    }

    addItem = (params = {}) => {
        const {product_id} = params;
        this.setLoading(true);
        this.setPending([...this.pending, product_id])
        return WishlistService.addItem(params).then((res) => {
            this.setLoading(false);
            this.setPending(this.pending.filter((p) => p !== product_id));
            return Promise.resolve(res);
        }).catch(() => {
            this.setLoading(false);
            this.setPending(this.pending.filter((p) => p !== product_id));
        });
    }

    setPending = (pending) => {
        this.pending = pending;
    }


}

const WishlistStore = new Wishlist();

export {
    WishlistStore
}