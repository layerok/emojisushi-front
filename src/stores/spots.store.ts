import {makeAutoObservable} from "mobx";
import LocalStorageService from "../services/local-storage.service";
import AccessApi from "../api/access.api";

export class SpotsStore {

    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    loading = false;
    items = [];
    selectedIndex = null;
    needRefresh = false;
    userSelectedSpot = false;

    setSelectedIndex = (index) => {
        this.selectedIndex = index;
        LocalStorageService.set('spot_id', this.items[index].id);

        Promise.all([
            this.rootStore.CartStore.clearCart(),
            this.rootStore.ProductsStore.fetchItems(this.rootStore.ProductsStore.lastParams),
            this.rootStore.CategoriesStore.fetchItems()
        ]).finally(() => this.rootStore.AppStore.setLoading(false))
    }

    setLoading = (state) => {
        this.loading = state;
    }

    get getAddress() {
        return this.getSelected?.address
    }

    get getPhones() {
        return this.getSelected?.phones;
    }

    get content() {
        return this.getSelected?.html_content;
    }

    get googleMapUrl() {
        return this.getSelected?.google_map_url;
    }

    get hasPhones() {
        return this.getPhones && this.getPhones !== '';
    }

    get getSelected() {
        return this.items?.[this.selectedIndex]
    }

    get getSelectedIndex() {
        return this.selectedIndex;
    }

    setItems = (items) => {
        this.items = items;
    }

    setUserSelectedSpot = (state) => {
        this.userSelectedSpot = state;
    }

    loadItems = async() => {
        this.setLoading(true);
        return AccessApi.getSpots().then((res) => {
            this.setItems(res.data.data);
        }).finally(() => {
            this.setLoading(false);
        });
    }
}

