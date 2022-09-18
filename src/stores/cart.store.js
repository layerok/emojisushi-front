import {makeAutoObservable} from "mobx";

class Cart {
    constructor() {
        makeAutoObservable(this);
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


}

const CartStore = new Cart();

export {
    CartStore
}