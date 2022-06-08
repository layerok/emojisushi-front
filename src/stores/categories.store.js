import MenuService from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Categories {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];

    fetchItems = () => {
        return MenuService.getCategories().then(res => {
            this.setItems(res.data.data);
        });
    }

    setName = (name) => {
        this.name = name;
    }

    setItems = (categories) => {
        this.items = categories;
    }
}

const CategoriesStore = new Categories();

export {
    CategoriesStore
}