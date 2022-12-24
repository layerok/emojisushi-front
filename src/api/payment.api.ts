import {client} from "../clients/client";

class Payment {
    getMethods(params = {}) {
        return client.get('payments', {
            params
        });
    }
}

const PaymentApi = new Payment();

export default PaymentApi;