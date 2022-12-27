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
    }

    changeSpot = (spot: ISpot, clearCart = false) => {
        const index = this.items.indexOf(spot);
        if(index === -1) {
            throw Error("Couldn't change spot")
        }
        if(index !== this.selectedIndex) {
            const selectedId = this.items[index].id;
            this.setSelectedIndex(index);

            LocalStorageService.set('spot_id', selectedId);

            const promises = [];

            if(clearCart) {
                promises.push(this.rootStore.CartStore.clearCart());
            }

            promises.push(this.rootStore.ProductsStore.fetchItems(this.rootStore.ProductsStore.lastParams))
            promises.push(this.rootStore.CategoriesStore.fetchItems())
            promises.push(this.rootStore.CartStore.fetchItems())

            Promise.all(promises).finally(() => this.rootStore.AppStore.setLoading(false))
        }
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

