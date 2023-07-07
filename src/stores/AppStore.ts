import { makeAutoObservable } from "mobx";
import spots from "../spots.json";

type Spot = {
  id: number;
  phones: string;
  html_content: string;
  google_map_url: string;
  slug: string;
  address: string;
  url: string;
  name: string;
};

const spot = spots.find(
  (spot) => spot.slug === process.env.REACT_APP_SPOT_SLUG
);

class AppStore {
  constructor() {
    makeAutoObservable(this);
  }
  lng = "uk";
  spots: Spot[] = spots as Spot[];
  spot: Spot = spot as Spot;
  setLng(lng: string) {
    this.lng = lng;
  }
}

export const useAppStore = () => {
  return appStore;
};

export const appStore = new AppStore();
