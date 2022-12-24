import {makeAutoObservable, transaction} from "mobx";
import WishlistApi from "../api/wishlist.api";

export class WishlistStore {

    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    loading = false;
    pending = [];

    setLoading = (state) => {
        this.loading = state;
    }

    setPending = (pending) => {
        this.pending = pending;
    }

    addItem = (params: {
        product_id: number;
        quantity?: number | null;
    }) => {
        const {product_id} = params;
        this.setLoading(true);
        this.setPending([...this.pending, product_id])
        return WishlistApi.addItem(params).then((res) => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter((p) => p !== product_id));
            })
            return Promise.resolve(res);
        }).catch(() => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter((p) => p !== product_id));
            })

        });
    }


}
