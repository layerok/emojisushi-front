import  {makeAutoObservable} from "mobx";
import AccessService from "../services/access.service";
import LocalStorageService from "../services/local-storage.service";

class Spots {

    constructor() {
        makeAutoObservable(this);
    }

    loading = false;
    items = [];
    selectedIndex = null;
    needRefresh = false;

    setSelectedIndex = (index) => {
        this.selectedIndex = index;
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

    get hasPhones() {
        return this.getPhones && this.getPhones !== '';
    }

    get getSelected() {
        return this.items?.[this.selectedIndex]
    }

    fetchItems = (params = {}) => {
        this.setLoading(false);
        AccessService.getSpots(params).then((res) => {
            this.setItems(res.data.data);
            this.setLoading(false);

            const selectedId = LocalStorageService.get('spot_id');

            const exist = res.data.data.find((item) => item.id === selectedId);
            if(!selectedId || !exist) {
                this.setSelectedIndex(0);
                this.refresh();
            } else {
                this.setSelectedIndex(res.data.data.indexOf(exist));
            }
        })
    }

    refresh = () => {
        this.setNeedRefresh(!this.needRefresh)
    }

    setNeedRefresh = (state) => {
        this.needRefresh = state;
    }

    setItems = (items) => {
        this.items = items;
    }
}

const SpotsStore = new Spots();

export {
    SpotsStore
}