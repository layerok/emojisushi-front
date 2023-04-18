import { AppStore } from "./app.store";
import { AuthStore } from "./auth.store";
import { CartStore } from "./cart.store";
import { WishlistStore } from "./wishlist.store";
import { makeAutoObservable } from "mobx";

export class RootStore {
  AppStore: AppStore;
  CartStore: CartStore;
  WishlistStore: WishlistStore;
  AuthStore: AuthStore;
  constructor() {
    makeAutoObservable({
      CategoriesStore: false,
      AppStore: false,
      CartStore: false,
      WishlistStore: false,
      AuthStore: false,
      CitiesStore: false,
    });
    this.AppStore = new AppStore(this);
    this.CartStore = new CartStore(this);
    this.WishlistStore = new WishlistStore(this);
    this.AuthStore = new AuthStore(this);
  }
}

export const rootStore = new RootStore();
export const stores = rootStore;
//todo: delete 'stores' export when you have replaced all it's occurrences to 'rootStore'
