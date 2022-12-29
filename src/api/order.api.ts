import {client} from "~clients/client";

class Order {
    place(params: {
        phone: string;
        firstname: string; // це ім'я зберігаеться на сайті
        lastname: string;
        email: string;

        shipping_method_id: number;
        payment_method_id: number;
        poster_firstname?: string; // це ім'я зберігаеться у постері
        poster_lastname?: string;
        poster_email?: string;
        address?: string;

        city: string;
        zip: string;
        country_code: string;

        comment?: string;
        sticks?: number
        change?: string;
    }) {
        return client.post('order/place', params);
    }
}

const OrderApi = new Order();

export default OrderApi;
