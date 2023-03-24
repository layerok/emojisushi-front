import { makeAutoObservable } from "mobx";
import PaymentApi from "../api/payment.api";
import { RootStore } from "~stores/stores";
import { IPaymentMethod } from "~api/payment.api.types";

export class PaymentStore {
  rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
  }

  loading = false;
  items: IPaymentMethod[] = [];
  selectedId = null;

  setSelectedId = (id) => {
    this.selectedId = id;
  };

  getSelectedMethod() {
    return this.items.find((item) => item.id === this.selectedId);
  }

  setLoading = (state) => {
    this.loading = state;
  };

  setItems = (items) => {
    this.items = items;
  };

  fetchItems = (params = {}) => {
    this.setLoading(false);
    return PaymentApi.getMethods(params)
      .then((res) => {
        this.setItems(res.data.data);
      })
      .finally(() => {
        this.setLoading(false);
      });
  };
}
