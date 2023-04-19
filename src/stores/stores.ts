import { AuthStore } from "./auth.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
  AuthStore: AuthStore;
  constructor() {
    makeAutoObservable({
      AuthStore: false,
    });
    this.AuthStore = new AuthStore(this);
  }
}

export const rootStore = new RootStore();
export const stores = rootStore;
//todo: delete 'stores' export when you have replaced all it's occurrences to 'rootStore'
