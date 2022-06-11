import MenuService from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Products {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    meta = {};
    step = 25;
    loading = false;
    lastParams = {};

    fetchItems = (params = {}) => {
        this.setLoading(true);
        this.setLastParams(params);
        return MenuService.getProducts(params).then(res => {
            this.setItems(res.data.data);
            this.setMeta(res.data.meta);
        }).finally(() => {
            this.setLoading(false);
        }).catch(() => {
            this.setLoading(false);
        });
    }

    refresh = () => {
        return this.fetchItems(this.lastParams)
    }

    setLastParams = (params) => {
        this.lastParams = params;
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