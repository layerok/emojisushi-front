import { Spot } from "~models/Spot";
import { useCity } from "./use-city";
import { useSpotSlug } from "./use-spot-slug";

export const useSpot = (): Spot | undefined => {
  const spotSlug = useSpotSlug();
  const city = useCity();
  const spot = (city?.spots || []).find((spot) => spot.slug === spotSlug);
  return spot;
};
