import { useRootStore } from "~hooks/use-root-store";

export const usePaymentStore = () => {
  return useRootStore().PaymentStore;
};
