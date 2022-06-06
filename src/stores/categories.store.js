import MenuServiceInstance from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Categories {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    name = "Меню";

    fetchItems = () => {
        return MenuServiceInstance.getCategories().then(res => {
            this.setItems(res.data.data);
        });
    }

    setItems = (categories) => {
        this.items = categories;
    }
}

const CategoriesStore = new Categories();

export {
    CategoriesStore
}