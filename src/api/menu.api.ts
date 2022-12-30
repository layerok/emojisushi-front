import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {ICategory} from "~api/menu.api.types";

class Menu {
    getProducts(params = {}) {
        return client.get('products', {
            params
        });
    }
    getCategories(params = {}): Promise<AxiosResponse<{
        data: ICategory[],
        meta: {
            total: number;
            offset: null | number;
            limit: null | number;
        }
    }>> {
        return client.get('categories', {
            params
        });
    }

    getIngredients(params = {}) {
        return client.get('ingredients', {
            params
        });
    }
}

const MenuApi = new Menu();

export default MenuApi;
