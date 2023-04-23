import { City } from "~models/City";
import { useCities } from "./use-cities";
import { useParams } from "react-router-dom";
export const useCity = (): City | undefined => {
  const { citySlug } = useParams();
  // todo: add return type
  const cities = useCities();
  const found = (cities || []).find((city) => city.slug === citySlug);
  if (found) {
    return new City(found);
  }
};
