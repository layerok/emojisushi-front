import {client} from "~clients/client";

class Shipping {
    getMethods(params = {}) {
        return client.get('shipping', {
            params
        });
    }
}

const ShippingApi = new Shipping();

export default ShippingApi;
