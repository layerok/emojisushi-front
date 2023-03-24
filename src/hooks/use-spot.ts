import { useParams } from "react-router-dom";
import { Spot } from "~stores/cities.store";
import { useCity } from "./use-city";

export const useSpot = (): Spot => {
  const { spotSlug } = useParams();
  const city = useCity();
  const spot = (city?.spots || []).find((spot) => spot.slug === spotSlug);
  return spot;
};
