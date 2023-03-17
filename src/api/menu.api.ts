import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {ICategory, IFilter, IProduct} from "~api/menu.api.types";
import {Nullable} from "~common/types";

class Menu {
    getProducts(params = {}): Promise<AxiosResponse<{
        data: IProduct[],
        total: number;
        sort_options: string[];
        filters: IFilter[]
    }>> {
        return client.get("products", {
          params,
          // @ts-ignore
          skipAuthRefresh: true,
        });
    }
    getCategories(params = {}): Promise<AxiosResponse<{
        data: ICategory[],
        meta: {
            total: number;
            offset: Nullable<number>
            limit: Nullable<number>
        }
    }>> {
        return client.get('categories', {
            params,
            // @ts-ignore
            skipAuthRefresh: true
        });
    }

    getIngredients(params = {}) {
        return client.get("ingredients", {
          params,
          // @ts-ignore
          skipAuthRefresh: true,
        });
    }
}

const MenuApi = new Menu();

export default MenuApi;
