import MenuService from "../services/menu.service";
import {makeAutoObservable} from "mobx";

class Products {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    meta = {
        filters: [],
        total: 0,
        offset: 0,
        limit: 25,
        sort_options: []
    };
    step = 25;
    loading = false;
    lastParams = {};
    sort = null;
    filters = [];

    fetchItems = (params = {}) => {
        this.setLoading(true);
        this.setLastParams(params);
        return MenuService.getProducts({
            ...params,
        }).then(res => {
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

    setSort = (sort) => {
        this.sort = sort;
    }

    setFilters = (filters) => {
        this.filters = filters;
    }

}

const ProductsStore = new Products();

export {
    ProductsStore
}