import { Spot } from "~models/Spot";
import { useCity } from "./use-city";
import { useParams } from "react-router-dom";

export const useSpot = (): Spot | undefined => {
  const { spotSlug } = useParams();
  const city = useCity();
  const spot = (city?.spots || []).find((spot) => spot.slug === spotSlug);
  return spot;
};
