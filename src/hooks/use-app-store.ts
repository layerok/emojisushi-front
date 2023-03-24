import { useRootStore } from "~hooks/use-root-store";

export const useAppStore = () => {
  return useRootStore().AppStore;
};
