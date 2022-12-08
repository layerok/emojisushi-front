import {stores} from "../stores/stores";
import ShippingApi from "../api/shipping.api";
const { ShippingStore } = stores;

class ShippingService {
    fetchItems = (params = {}) => {
        ShippingStore.setLoading(false);
        return ShippingApi.getMethods(params).then((res) => {
            ShippingStore.setItems(res.data.data);
            ShippingStore.setLoading(false);
        })
    }
}


export const shippingService = new ShippingService();