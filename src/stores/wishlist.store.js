import {makeAutoObservable} from "mobx";

class Wishlist {

    constructor() {
        makeAutoObservable(this);
    }
    loading = false;
    pending = [];

    setLoading = (state) => {
        this.loading = state;
    }

    setPending = (pending) => {
        this.pending = pending;
    }


}

const WishlistStore = new Wishlist();

export {
    WishlistStore
}