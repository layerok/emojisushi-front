import {client} from "../clients/client";

class Menu {
    getProducts(params = {}) {
        return client.get('products', {
            params
        });
    }
    getCategories(params = {}) {
        return client.get('categories', {
            params
        });
    }
}

const MenuService = new Menu();

export default MenuService;