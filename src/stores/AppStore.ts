import { makeAutoObservable } from "mobx";
import { ICity, ISpot } from "~api/types";

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
  lng = "uk";
  userConfirmedLocation = false;
  spot: ISpot = null;
  city: ICity = null;
  setLng(lng: string) {
    this.lng = lng;
  }
  setSpot(spot: ISpot) {
    this.spot = spot;
  }

  setCity(city: ICity) {
    this.city = city;
  }
  setUserConfirmedLocation(state: boolean) {
    this.userConfirmedLocation = state;
  }
}

export const useAppStore = () => {
  return appStore;
};

export const appStore = new AppStore();
