import { makeAutoObservable, reaction } from "mobx";
import { ISpot } from "~api/types";
import { setToLocalStorage } from "~utils/ls.utils";

class AppStore {
  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.spot,
      (spot) => {
        setToLocalStorage("selectedSpotSlug", spot.slug);
      }
    );
  }
  lng = "uk";
  spot: ISpot | null = null;
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
