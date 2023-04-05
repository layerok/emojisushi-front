import { makeAutoObservable } from "mobx";
import { ICategory } from "~api/menu.api.types";

export class Category {
  json: ICategory;
  constructor(json: ICategory) {
    this.json = json;
    makeAutoObservable(this);
  }

  isHidden(spotSlug: string) {
    return !this.json.published && this.isHiddenInSpot(spotSlug);
  }

  isHiddenInSpot(spotSlug: string) {
    return this.json.hide_categories_in_spot
      .map((spot) => spot.slug)
      .includes(spotSlug);
  }
}
