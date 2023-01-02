import {useRootStore} from "~hooks/use-root-store";
import {AuthStore} from "~stores/auth.store";

export const useAuthStore = (): AuthStore => {
  return useRootStore().AuthStore;
}
