import MenuServiceInstance from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Menu {
    constructor() {
        makeAutoObservable(this);
    }
    products = [];
    categories = [];
    category_name = "Меню";

    fetchProducts = () => {
        MenuServiceInstance.getProducts({
            offset: 0,
            limit: 25
        }).then(res => {
            this.setProducts(res.data.data);
        });
    }

    fetchCategories = () => {
        MenuServiceInstance.getCategories().then(res => {
            this.setCategories(res.data.data);
        });
    }

    setProducts = (products) => {
        this.products = products;
    }

    setCategories = (categories) => {
        this.categories = categories;
    }
}

const MenuStore = new Menu();

export {
    MenuStore
}