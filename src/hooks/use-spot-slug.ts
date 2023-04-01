import { useParams } from "react-router-dom";

export const useSpotSlug = () => {
  const { spotSlug } = useParams();
  return spotSlug;
};
