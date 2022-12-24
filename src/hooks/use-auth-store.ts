import {rootStore} from "~stores/stores";

export const useAuthStore = () => {
  return rootStore.AuthStore;
}
