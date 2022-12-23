import {rootStore} from "../stores/stores";

export const usePaymentStore = () => {
  return rootStore.PaymentStore;
}
