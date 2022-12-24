import {makeAutoObservable, transaction} from "mobx";
import ShippingApi from "../api/shipping.api";

export class ShippingStore {

    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    loading = false;
    items = [];
    selectedId = null;

    setSelectedId = (id) => {
        this.selectedId = id;
    }

    getSelectedMethod() {
        return this.items.find((item) => item.id === this.selectedId);
    }

    setLoading = (state) => {
        this.loading = state;
    }

    setItems = (items) => {
        this.items = items;
    }

    fetchItems = (params = {}) => {
        this.setLoading(false);
        return ShippingApi.getMethods(params).then((res) => {
            this.setItems(res.data.data);
        }).finally(() => {
            this.setLoading(false);
        })
    }
}
