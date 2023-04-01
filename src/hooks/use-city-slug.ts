import { useParams } from "react-router-dom";

export const useCitySlug = () => {
  const { citySlug } = useParams();
  return citySlug;
};
