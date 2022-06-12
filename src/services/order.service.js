import {client} from "../clients/client";

class Order {
    place(params = {}) {
        return client.post('order/place', params);
    }
}

const OrderService = new Order();

export default OrderService;