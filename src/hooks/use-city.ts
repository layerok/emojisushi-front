import { useCitiesStore } from "./use-cities-store";
import { City } from "~stores/cities.store";
import { useCitySlug } from "./use-city-slug";

export const useCity = (): City | undefined => {
  const citySlug = useCitySlug();
  const citiesStore = useCitiesStore();
  return citiesStore.items.find((city) => city.slug === citySlug);
};
