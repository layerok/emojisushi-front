import {makeAutoObservable, transaction} from "mobx";
import CartApi from "../api/cart.api";

export class CartStore {
    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    items = [];
    loading = false;
    total = 0;
    totalQuantity = 0;
    pending = [];

    setName = (name) => {
        this.name = name;
    }

    setItems = (categories) => {
        this.items = categories;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    setPending = (value) => {
        this.pending = value;
    }

    setTotal = (value) => {
        this.total = value;
    }

    setTotalQuantity = (value) => {
        this.totalQuantity = value;
    }

    clearCart = () => {
        return CartApi.clearCart().then((res) => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity)
            })

        })
    }

    fetchItems() {
        this.setLoading(true);
        return CartApi.getProducts().then(res => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setTotal(res.data.total)
                this.setTotalQuantity(res.data.totalQuantity);
            })
        }).catch(() => {
            this.setLoading(false);
        }).finally(() => {
            this.setLoading(false);
        });
    }

    addProduct(params = {}) {
        const {product_id} = params;

        this.setLoading(true);
        this.setPending([...this.pending, product_id]);
        return CartApi.addProduct(params).then((res) => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity);
            })
        }).finally(() => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter(id=> id !== product_id));
            })

        }).catch(() => {
            transaction(() => {
                this.setLoading(false);
                this.setPending(this.pending.filter(id=> id !== product_id));
            })

        });
    }

    removeCartProduct(cart_product_id) {
        this.setLoading(true);
        return CartApi.removeCartProduct(cart_product_id).then((res) => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setTotal(res.data.total);
                this.setTotalQuantity(res.data.totalQuantity);
            })

        }).finally(() => {
            this.setLoading(false);
        }).catch(() => {
            this.setLoading(false);
        });
    }


}
