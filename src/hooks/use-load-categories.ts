import { useFetcher, useParams } from "react-router-dom";
import { useEffect } from "react";
import { CategoriesLoaderResolvedData } from "~pages/Categories";

export const useLoadCategories = () => {
  const fetcher = useFetcher<CategoriesLoaderResolvedData>();
  const { lang, spotSlug, citySlug } = useParams();

  useEffect(() => {
    fetcher.load(`/${lang}/${citySlug}/${spotSlug}/category`);
  }, []);

  return fetcher;
};
