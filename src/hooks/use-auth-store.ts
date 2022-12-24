import {useRootStore} from "~hooks/use-root-store";

export const useAuthStore = () => {
  return useRootStore().AuthStore;
}
