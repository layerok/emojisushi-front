import {makeAutoObservable, transaction} from "mobx";
import WishlistApi from "../api/wishlist.api";
import {RootStore} from "~stores/stores";

export class WishlistStore {

    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    loading = false;
    pending: number[] = [];

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    setPending = (pending: number[]) => {
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
