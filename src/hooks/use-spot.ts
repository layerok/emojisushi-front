import {useParams} from "react-router-dom";
import {useSpotsStore} from "~hooks/use-spots-store";

export const useSpot = () => {
  const {spotSlug} = useParams();
  const spotsStore = useSpotsStore();
  return spotsStore.items.find(spot => spot.slug === spotSlug);
}
