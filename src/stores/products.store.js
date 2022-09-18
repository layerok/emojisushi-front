import {makeAutoObservable} from "mobx";

class Products {
    constructor() {
        makeAutoObservable(this);
    }
    items = [];
    limit = 25;
    sortOptions = [];
    offset = 0;
    step = 25;
    loading = false;
    lastParams = {};
    sort = null;
    filters = [];
    selectedFilters = [];
    total = 0;
    search = "";


    setLastParams = (params) => {
        this.lastParams = params;
    }

    setItems = (products) => {
        this.items = products;
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

    setOffset = (offset) => {
        this.offset = offset;
    }

    setSortOptions = (options) => {
        this.sortOptions = options;
    }

    setLimit = (limit) => {
        this.limit = limit;
    }

    setTotal = (total) => {
        this.total = total
    }

    setSelectedFilters = (filters) => {
        this.selectedFilters = filters;
    }

    setSearch = (search) => {
        this.search = search;
    }

    clearSearch = () => {
        this.setSearch("");
    }

}

const ProductsStore = new Products();

export {
    ProductsStore
}