import  {makeAutoObservable} from "mobx";
import AccessService from "../services/access.service";
import LocalStorageService from "../services/local-storage.service";

class Spots {

    constructor() {
        makeAutoObservable(this);
    }

    loading = false;
    items = [];
    selectedIndex = 0;

    setSelectedIndex = (index) => {
        this.selectedIndex = index;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    get getAddress() {
        return this.items?.[this.selectedIndex]?.address
    }

    fetchItems = (params = {}) => {
        this.setLoading(false);
        AccessService.getSpots(params).then((res) => {
            this.setItems(res.data.data);
            this.setLoading(false);
            const selectedId = LocalStorageService.get('spot_id');

            const exist = res.data.data.find((item) => item.id === selectedId);
            if(!selectedId || !exist) {
                LocalStorageService.set('spot_id', res.data.data[0].id)
            } else {

                this.setSelectedIndex(res.data.data.indexOf(exist));
            }
        })
    }

    setItems = (items) => {
        this.items = items;
    }
}

const SpotsStore = new Spots();

export {
    SpotsStore
}