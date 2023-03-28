import { makeAutoObservable } from "mobx";
import MenuApi from "../api/menu.api";
import { RootStore } from "./stores";
import { ICategory, IGetCategoriesParams } from "~api/menu.api.types";

export class CategoriesStore {
  rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
  }
  items: ICategory[] = [];
  name: string = "";
  loading = false;

  setName = (name: string) => {
    this.name = name;
  };

  setItems = (categories: ICategory[]) => {
    this.items = categories;
  };

  async fetchItems(params: IGetCategoriesParams = {}) {
    this.setLoading(true);
    const res = await MenuApi.getCategories({
      ...params,
    });
    const items = res.data.data;
    this.setItems(items);
    this.setLoading(false);
    return items;
  }

  findCategoryBySlug(slug: string) {
    return this.items.find((item) => item.slug === slug);
  }

  setLoading(state: boolean) {
    this.loading = state;
  }

  get count() {
    return this.items.length;
  }

  get publishedCategories() {
    return this.items.filter((category) => category.published);
  }
}
