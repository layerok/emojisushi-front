import {stores} from "../stores/stores";
import PaymentApi from "../api/payment.api";
const { PaymentStore } = stores;

class PaymentService {
    fetchItems = (params = {}) => {
        PaymentStore.setLoading(false);
        return PaymentApi.getMethods(params).then((res) => {
            PaymentStore.setItems(res.data.data);
            PaymentStore.setLoading(false);
        })
    }
}


export const paymentService = new PaymentService();