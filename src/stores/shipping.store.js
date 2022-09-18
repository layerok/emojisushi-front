import {makeAutoObservable} from "mobx";

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

    setItems = (items) => {
        this.items = items;
    }
}

const ShippingStore = new Shipping();

export {
    ShippingStore
}