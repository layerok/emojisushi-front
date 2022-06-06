import {client} from "../clients/client";

class MenuService {
    getProducts(params) {
        return client.get('products', {
            params
        });
    }
    getCategories(params) {
        return client.get('categories', {
            params
        });
    }
}

const MenuServiceInstance = new MenuService();

export default MenuServiceInstance;