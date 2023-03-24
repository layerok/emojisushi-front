import { makeAutoObservable } from "mobx";
import MenuApi from "../api/menu.api";
import { RootStore, stores } from "./stores";
import { IGetCategoriesParams } from "~api/menu.api.types";

export class CategoriesStore {
  rootStore: RootStore;
  constructor(rootStore) {
    makeAutoObservable(this, {
      rootStore: false,
    });
    this.rootStore = rootStore;
  }
  items = [];
  name: string = "";
  loading = false;

  setName = (name: string) => {
    this.name = name;
  };

  setItems = (categories) => {
    this.items = categories;
  };

  fetchItems(params: IGetCategoriesParams = {}) {
    this.setLoading(true);
    return MenuApi.getCategories({
      ...params,
    })
      .then((res) => {
        stores.CategoriesStore.setItems(res.data.data);
      })
      .finally(() => {
        this.setLoading(false);
      });
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
}
