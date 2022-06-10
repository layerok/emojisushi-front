import {makeAutoObservable} from "mobx";
import ShippingService from "../services/shipping.service";

class Shipping {

    constructor() {
        makeAutoObservable(this);
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

    fetchItems = (params = {}) => {
        this.setLoading(false);
        ShippingService.getMethods(params).then((res) => {
            this.setItems(res.data.data);
            this.setLoading(false);
        })
    }

    setItems = (items) => {
        this.items = items;
    }
}

const ShippingStore = new Shipping();

export {
    ShippingStore
}