import { useFetcher } from "react-router-dom";
import { useLang } from "./use-lang";
import { useSpotSlug } from "./use-spot-slug";
import { useCitySlug } from "./use-city-slug";
import { useEffect } from "react";
import { CategoriesLoaderResolvedData } from "~pages/Categories";

export const useLoadCategories = () => {
  const fetcher = useFetcher<CategoriesLoaderResolvedData>();
  const lang = useLang();
  const spotSlug = useSpotSlug();
  const citySlug = useCitySlug();

  useEffect(() => {
    fetcher.load(`/${lang}/${citySlug}/${spotSlug}/category`);
  }, []);

  return fetcher;
};
