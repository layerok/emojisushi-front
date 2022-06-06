import MenuServiceInstance from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Products {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];

    fetchItems = (params = {}) => {
        return MenuServiceInstance.getProducts(params).then(res => {
            this.setItems(res.data.data);
        });
    }

    setItems = (products) => {
        this.items = products;
    }

}

const ProductsStore = new Products();

export {
    ProductsStore
}