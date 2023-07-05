import { client } from "~clients/client";

export const orderApi = {
  place(params: {
    phone: string;
    firstname?: string; // це ім'я зберігаеться на сайті
    lastname?: string;
    email?: string;
    spot_id_or_slug: string | number;

    shipping_method_id: number;
    payment_method_id: number;
    address?: string;

    comment?: string;
    sticks?: number;
    change?: string;
  }) {
    return client.post("order/place", params);
  },
};
