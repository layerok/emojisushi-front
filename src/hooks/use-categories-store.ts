import {rootStore} from "~stores/stores";

export const useProductsStore = () => {
  return rootStore.ProductsStore;
}
