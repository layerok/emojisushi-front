import {client} from "../clients/client";

class Payment {
    getMethods(params = {}) {
        return client.get('payments', {
            params
        });
    }
}

const PaymentService = new Payment();

export default PaymentService;