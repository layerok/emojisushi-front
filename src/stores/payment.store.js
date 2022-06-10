import {makeAutoObservable} from "mobx";
import PaymentService from "../services/payment.service";

class Payment {

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
        PaymentService.getMethods(params).then((res) => {
            this.setItems(res.data.data);
            this.setLoading(false);
        })
    }

    setItems = (items) => {
        this.items = items;
    }
}

const PaymentStore = new Payment();

export {
    PaymentStore
}