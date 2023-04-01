import { useParams } from "react-router-dom";

export const useCategorySlug = () => {
  const { categorySlug } = useParams();
  return categorySlug;
};
