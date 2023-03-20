import {useParams} from "react-router-dom";
import { useCity } from "./use-city";

export const useSpot = () => {
  const {spotSlug} = useParams();
  const city = useCity();
  return (city?.spots || []).find(spot => spot.slug === spotSlug);
}
