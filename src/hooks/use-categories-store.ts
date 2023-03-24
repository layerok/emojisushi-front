import { useRootStore } from "~hooks/use-root-store";

export const useProductsStore = () => {
  return useRootStore().ProductsStore;
};
