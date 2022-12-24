import {useRootStore} from "~hooks/use-root-store";

export const useSpotsStore = () => {
  return useRootStore().SpotsStore;
}
