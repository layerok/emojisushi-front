import MenuService from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Products {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    meta = {};
    offset = 25;
    loading = false;

    fetchItems = (params = {}) => {
        this.setLoading(true);
        return MenuService.getProducts(params).then(res => {
            this.setItems(res.data.data);
            this.setMeta(res.data.meta);
        }).finally(() => {
            this.setLoading(false);
        }).catch(() => {
            this.setLoading(false);
        });
    }

    setItems = (products) => {
        this.items = products;
    }

    setMeta = (meta) => {
        this.meta = meta;
    }

    setLoading = (state) => {
        this.loading = state;
    }

}

const ProductsStore = new Products();

export {
    ProductsStore
}