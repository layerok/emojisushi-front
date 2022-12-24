import {useRootStore} from "~hooks/use-root-store";

export const useShippingStore = () => {
  return useRootStore().ShippingStore;
}
