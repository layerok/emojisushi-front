import MenuServiceInstance from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Menu {
    constructor() {
        makeAutoObservable(this);
    }
    products = [];
    category_name = "Меню";

    fetchProducts = () => {
        MenuServiceInstance.getProducts().then(res => {
            this.setProducts(res.data.data);
        });
    }

    setProducts = (products) => {
        this.products = products;
    }
}

const MenuStore = new Menu();

export {
    MenuStore
}