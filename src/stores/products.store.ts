import {makeAutoObservable, transaction} from "mobx";
import MenuApi from "../api/menu.api";

export class ProductsStore {
    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
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

    fetchItems(params = {}) {
        this.setLoading(true);
        this.setLastParams(params);

        const filter = this.selectedFilters.reduce((acc, slug) => {
            return acc + `&${slug}=${slug}`;
        }, "")

        return MenuApi.getProducts({
            filter: filter,
            category_slug: "menu",
            search: this.search,
            sort: this.sort,
            offset: this.offset,
            limit: this.limit,
            ...params,
        }).then(res => {
            transaction(() => {
                this.setItems(res.data.data);
                this.setFilters(res.data.filters);
                this.setSortOptions(res.data.sort_options)
                this.setTotal(res.data.total);
            })
        }).finally(() => {
            this.setLoading(false);
        }).catch(() => {
            this.setLoading(false);
        });
    }

    refresh() {
        return this.fetchItems(this.lastParams)
    }

}
