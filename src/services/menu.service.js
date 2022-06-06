import {client} from "../clients/client";

class MenuService {
    getProducts() {
        return client.get('products');
    }
}

const MenuServiceInstance = new MenuService();

export default MenuServiceInstance;