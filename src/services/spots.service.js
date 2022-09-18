import {stores} from "../stores/stores";
import AccessApi from "../api/access.api";
import LocalStorageApi from "../api/local-storage.api";
const { SpotsStore } = stores;

class SpotsService {
    fetchItems = (params = {}) => {
        SpotsStore.setLoading(false);
        AccessApi.getSpots(params).then((res) => {
            SpotsStore.setItems(res.data.data);
            SpotsStore.setLoading(false);

            const selectedId = LocalStorageApi.get('spot_id');

            const exist = res.data.data.find((item) => item.id === selectedId);
            if(!selectedId || !exist) {
                SpotsStore.setSelectedIndex(0);
                SpotsStore.refresh();
            } else {
                SpotsStore.setSelectedIndex(res.data.data.indexOf(exist));
            }
        })
    }
}


export const spotsService = new SpotsService();