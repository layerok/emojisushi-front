import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {IShippingMethod} from "~api/shipping.api.types";

class Shipping {
    getMethods(params = {}): Promise<AxiosResponse<{
        data: IShippingMethod[],
        meta: {
            total: number;
        }
    }>> {
        return client.get('shipping', {
            params
        });
    }
}

const ShippingApi = new Shipping();

export default ShippingApi;
