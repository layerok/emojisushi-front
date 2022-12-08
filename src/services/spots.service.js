import {stores} from "../stores/stores";
import AccessApi from "../api/access.api";
const { SpotsStore } = stores;

class SpotsService {
    loadItems = async() => {
        SpotsStore.setLoading(true);
        return AccessApi.getSpots().then((res) => {
            SpotsStore.setItems(res.data.data);
        }).finally(() => {
            SpotsStore.setLoading(false);
        });
    }
}

export const spotsService = new SpotsService();