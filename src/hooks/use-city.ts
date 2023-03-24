import { useParams } from "react-router-dom";
import { useCitiesStore } from "./use-cities-store";

export const useCity = () => {
  const { citySlug } = useParams();
  const citiesStore = useCitiesStore();
  return citiesStore.items.find((city) => city.slug === citySlug);
};
