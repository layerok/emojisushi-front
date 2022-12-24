import {useRootStore} from "~hooks/use-root-store";

export const useCartStore = () => {
  return useRootStore().CartStore;
}
