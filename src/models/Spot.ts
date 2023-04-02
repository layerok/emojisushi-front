import { makeAutoObservable } from "mobx";
import { ISpot } from "~api/access.api.types";
import { City } from "./City";

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
