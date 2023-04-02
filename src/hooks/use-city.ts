import { City } from "~models/City";
import { useCitySlug } from "./use-city-slug";
import { useQuery } from "react-query";
import { citiesQuery } from "~components/EnsureLocation";
import { useCities } from "./use-cities";
export const useCity = (): City | undefined => {
  const citySlug = useCitySlug();
  // todo: add return type
  const cities = useCities();
  const found = (cities || []).find((city) => city.slug === citySlug);
  if (found) {
    return new City(found);
  }
};
