import {useRootStore} from "~hooks/use-root-store";
import {CitiesStore} from "~stores/cities.store";

export const useCitiesStore = (): CitiesStore => {
  return useRootStore().CitiesStore;
}
