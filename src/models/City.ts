import { makeAutoObservable } from "mobx";
import { ICity } from "~api/access.api.types";
import { Spot } from "./Spot";

export class City {
  json: ICity;
  constructor(json) {
    this.json = json;
    makeAutoObservable(this);
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
