import { useRootStore } from "~hooks/use-root-store";

export const useCategoriesStore = () => {
  return useRootStore().CategoriesStore;
};
