import { makeAutoObservable } from "mobx";
import { ICategory } from "~api/menu.api.types";
import { Category } from "~models";

export class CategoriesStore {
  items: ICategory[] = [];
  constructor(categories: ICategory[]) {
    this.items = categories;
    makeAutoObservable(this);
  }

  get models() {
    return this.items.map((i) => new Category(i));
  }

  setItems(items: ICategory[]) {
    this.items = items;
  }

  getPublishedModels(spotSlug: string) {
    return this.items
      .map((c) => new Category(c))
      .filter((category) => !category.isHidden(spotSlug));
  }

  getPublishedItems(spotSlug: string) {
    return this.getPublishedModels(spotSlug).map((m) => m.json);
  }
}
