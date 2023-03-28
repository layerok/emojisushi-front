import { makeAutoObservable } from "mobx";
import LocalStorageService from "../services/local-storage.service";
import AccessApi from "../api/access.api";
import { RootStore } from "~stores/stores";
import { ICity, ISpot } from "~api/access.api.types";

export class City {
  json: ICity;
  store: CitiesStore;
  constructor(json, store: CitiesStore) {
    this.json = json;
    this.store = store;
    makeAutoObservable(this, {
      store: false,
    });
  }

  get name() {
    return this.json.name;
  }

  get id() {
    return this.json.id;
  }

  get slug() {
    return this.json.slug;
  }

  get spots() {
    return (this.json.spots || []).map((spot) => new Spot(spot, this));
  }
}

export class Spot {
  json: ISpot;
  city;
  constructor(spot: ISpot, city: City) {
    this.city = city;
    this.json = spot;
    makeAutoObservable(this, {
      city: false,
    });
  }

  get cover() {
    return this.json.cover;
  }

  get id() {
    return this.json.id;
  }

  get slug() {
    return this.json.slug;
  }

  get name() {
    return this.json.name;
  }

  get address() {
    return this.json.address;
  }

  get content() {
    return this.json.html_content;
  }

  get googleMapUrl() {
    return this.json.google_map_url;
  }

  get hasPhones() {
    // todo: parse phones string here, not on upper levels
    return !!this.json.phones.length;
  }

  get phones() {
    return this.json.phones;
  }
}

export class CitiesStore {
  rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
  }

  loading = false;
  items: City[] = [];
  selectedIndex: number | null = null;

  setSelectedIndex = (index: number) => {
    this.selectedIndex = index;
  };

  select = (city: City, onSelect?: () => void) => {
    if (!this.exists(city)) {
      throw Error("Couldn't change city");
    }

    const selected = this.selected(city);

    if (!selected) {
      const index = this.index(city);
      const selectedId = this.items[index].id;
      this.setSelectedIndex(index);

      LocalStorageService.set("city_id", selectedId);
      onSelect && onSelect();
    }
  };

  exists(city: City) {
    const index = this.index(city);
    return index !== -1;
  }

  index(city: City) {
    return this.items.indexOf(city);
  }

  selected(city: City) {
    const index = this.index(city);
    return index === this.selectedIndex;
  }

  setLoading = (state) => {
    this.loading = state;
  };

  get getSelected(): City | undefined {
    return this.items?.[this.selectedIndex];
  }

  get getSelectedIndex(): number | null {
    return this.selectedIndex;
  }

  setItems = (items: City[]) => {
    this.items = items;
  };

  loadItems = async (includeSpots = false) => {
    this.setLoading(true);
    const res = await AccessApi.getCities({
      includeSpots,
    });

    const instanses = res.data.data.map((city) => new City(city, this));

    this.setItems(instanses);
    this.setLoading(false);
    return instanses;
  };
}
