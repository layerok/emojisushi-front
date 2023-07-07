import { makeAutoObservable } from "mobx";
import { ISpot } from "~api/types";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
  lng = "uk";
  spot: ISpot = null;
  setLng(lng: string) {
    this.lng = lng;
  }
  setSpot(spot: ISpot) {
    this.spot = spot;
  }
}

export const useAppStore = () => {
  return appStore;
};

export const appStore = new AppStore();
