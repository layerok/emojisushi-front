import {client} from "../clients/client";

class Shipping {
    getMethods(params = {}) {
        return client.get('shipping', {
            params
        });
    }
}

const ShippingService = new Shipping();

export default ShippingService;