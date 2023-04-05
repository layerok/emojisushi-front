import { useFetcher } from "react-router-dom";
import { useLang } from "./use-lang";
import { useSpotSlug } from "./use-spot-slug";
import { useCitySlug } from "./use-city-slug";
import { useEffect } from "react";
import { CategoryLoaderResolvedDeferredData } from "~pages/Category";

export const useLoadProducts = () => {
  const fetcher = useFetcher<CategoryLoaderResolvedDeferredData>();
  const lang = useLang();
  const spotSlug = useSpotSlug();
  const citySlug = useCitySlug();

  useEffect(() => {
    fetcher.load(`/${lang}/${citySlug}/${spotSlug}/category`);
  }, []);

  return fetcher;
};
