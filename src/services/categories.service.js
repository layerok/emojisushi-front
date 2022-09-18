import {stores} from "../stores/stores";
import MenuApi from "../api/menu.api";
const { CategoriesStore } = stores;

class CategoriesService {
    fetchItems() {
        return MenuApi.getCategories().then(res => {
            CategoriesStore.setItems(res.data.data);
        });
    }
}


export const categoriesService = new CategoriesService();