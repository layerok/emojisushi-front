import {client} from "../clients/client";

class Order {
    place(params = {}) {
        return client.post('order/place', params);
    }
}

const OrderApi = new Order();

export default OrderApi;