import {client} from "~clients/client";

class Order {
    place(params: {
        phone: string;
        firstname?: string; // це ім'я зберігаеться на сайті
        lastname?: string;
        email?: string;

        shipping_method_id: number;
        payment_method_id: number;
        // 'address' has priority over 'address_id'
        address?: string;
        address_id?: string;

        comment?: string;
        sticks?: number
        change?: string;
    }) {
        return client.post('order/place', params);
    }
}

const OrderApi = new Order();

export default OrderApi;
