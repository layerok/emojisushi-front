import { useParams } from "react-router-dom";

export const useCategory = () => {
  const { categorySlug } = useParams();
  return categorySlug;
};
