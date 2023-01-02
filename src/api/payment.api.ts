import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {IPaymentMethod} from "~api/payment.api.types";

class Payment {
    getMethods(params = {}): Promise<AxiosResponse<{
        data: IPaymentMethod[],
        meta: {
            total: number;
        }
    }>> {
        return client.get('payments', {
            params
        });
    }
}

const PaymentApi = new Payment();

export default PaymentApi;
