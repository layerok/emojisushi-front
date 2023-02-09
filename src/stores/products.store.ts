import {makeAutoObservable, transaction} from "mobx";
import MenuApi from "../api/menu.api";
import {RootStore} from "~stores/stores";
import {IProduct} from "~api/menu.api.types";

export class Product {
    json: IProduct;
    constructor(json) {
        this.json = json;
        makeAutoObservable(this);
    }

    get id() {
        return this.json.id;
    }

    get name() {
        return this.json.id;
    }

    get weight() {
        return this.json.weight;
    }

    get isFavorite() {
        return this.json.is_favorite_;
    }

    set isFavorite(state) {
        this.json.is_favorite_ = state;
    }

    get propertyValues() {
        return this.json.property_values;
    }

    get variants() {
        return this.json.variants;
    }

    get inventoryManagementMethod() {
        return this.json.inventory_management_method
    }

    get additionalPrices() {
        return this.json.additional_prices || [];
    }

    get prices() {
        return this.json.prices || [];
    }

    get descriptionShort() {
        return this.json.description_short
    }

    get description() {
        return this.json.description;
    }

    get imageSets() {
        return this.json.image_sets || [];
    }
}

export class ProductsStore {
    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }
    items: Product[] = [];
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

    setItems = (products: Product[]) => {
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
                const instances = res.data.data.map(json => {
                    return new Product(json);
                })
                this.setItems(instances);
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
