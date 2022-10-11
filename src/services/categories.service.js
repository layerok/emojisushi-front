import {stores} from "../stores/stores";
import MenuApi from "../api/menu.api";
import {SpotsStore} from "../stores/spots.store";
const { CategoriesStore } = stores;

class CategoriesService {
    fetchItems(params = {}) {
        return MenuApi.getCategories({
            ...params,
            spot_id: SpotsStore.getSelected,
        }).then(res => {
            CategoriesStore.setItems(res.data.data);
        });
    }
}


export const categoriesService = new CategoriesService();