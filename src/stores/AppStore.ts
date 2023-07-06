import { makeAutoObservable } from "mobx";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
  lng = "uk";
  setLng(lng: string) {
    this.lng = lng;
  }
}

export const appStore = new AppStore();
