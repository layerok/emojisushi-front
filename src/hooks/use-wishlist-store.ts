import {useRootStore} from "~hooks/use-root-store";

export const useWishlistStore = () => {
  return useRootStore().WishlistStore;
}
