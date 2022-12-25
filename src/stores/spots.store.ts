import {makeAutoObservable} from "mobx";
import LocalStorageService from "../services/local-storage.service";
import AccessApi from "../api/access.api";
import {RootStore} from "~stores/stores";
import {ISpot} from "~api/access.api.types";

export class SpotsStore {

    rootStore: RootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    loading = false;
    items: ISpot[] = [];
    selectedIndex: number | null = null;
    userSelectedSpot = false;

    setSelectedIndex = (index: number) => {
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

    get getAddress(): string | undefined | null {
        return this.getSelected?.address
    }

    get getPhones(): string | undefined | null {
        return this.getSelected?.phones;
    }

    get content(): string | undefined | null {
        return this.getSelected?.html_content;
    }

    get googleMapUrl(): string | undefined | null {
        return this.getSelected?.google_map_url;
    }

    get hasPhones(): boolean {
        return this.getPhones && this.getPhones !== '';
    }

    get getSelected(): ISpot | undefined {
        return this.items?.[this.selectedIndex]
    }

    get getSelectedIndex(): number | null {
        return this.selectedIndex;
    }

    setItems = (items: ISpot[]) => {
        this.items = items;
    }

    setUserSelectedSpot = (state: boolean) => {
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

