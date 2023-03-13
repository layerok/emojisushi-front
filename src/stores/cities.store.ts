import {makeAutoObservable} from "mobx";
import LocalStorageService from "../services/local-storage.service";
import AccessApi from "../api/access.api";
import {RootStore} from "~stores/stores";
import {ICity} from "~api/access.api.types";

export class CitiesStore {

    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    loading = false;
    items: ICity[] = [];
    selectedIndex: number | null = null;

    setSelectedIndex = (index: number) => {
        this.selectedIndex = index;
    }

    select = (city: ICity, onSelect?: () => void ) => {

        if(!this.exists(city)) {
            throw Error("Couldn't change city")
        }

        const selected = this.selected(city);

        if(!selected) {
            const index = this.index(city);
            const selectedId = this.items[index].id;
            this.setSelectedIndex(index);

            LocalStorageService.set('city_id', selectedId);
            onSelect && onSelect();
        }

    }

    exists(city: ICity) {
        const index = this.index(city);
        return index !== -1
    }

    index(city: ICity) {
        return this.items.indexOf(city);
    }

    selected(city: ICity) {
        const index = this.index(city);
        return index === this.selectedIndex
    }

    setLoading = (state) => {
        this.loading = state;
    }

    get getSelected(): ICity | undefined {
        return this.items?.[this.selectedIndex]
    }

    get getSelectedIndex(): number | null {
        return this.selectedIndex;
    }

    setItems = (items: ICity[]) => {
        this.items = items;
    }

    loadItems = async() => {
        this.setLoading(true);
        return AccessApi.getCities().then((res) => {
            this.setItems(res.data.data);
        }).finally(() => {
            this.setLoading(false);
        });
    }
}

