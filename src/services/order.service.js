import {client} from "../clients/client";

class Order {
    place(params = {}) {
        return client.get('order/place', {
            params
        });
    }
}

const OrderService = new Order();

export default OrderService;