import {makeAutoObservable} from "mobx";
import MenuApi from "../api/menu.api";
import {stores} from "./stores";

export class CategoriesStore {
    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    items = [];
    name: string = "";

    setName = (name: string) => {
        this.name = name;
    }

    setItems = (categories) => {
        this.items = categories;
    }

    fetchItems(params = {}) {
        return MenuApi.getCategories({
            ...params,
        }).then(res => {
            stores.CategoriesStore.setItems(res.data.data);
        });
    }
}
