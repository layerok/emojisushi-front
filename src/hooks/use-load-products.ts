import { useFetcher, useParams } from "react-router-dom";
import { useEffect } from "react";
import { CategoryLoaderResolvedDeferredData } from "~pages/Category";

export const useLoadProducts = () => {
  const fetcher = useFetcher<CategoryLoaderResolvedDeferredData>();
  const { lang, spotSlug, citySlug } = useParams();
  useEffect(() => {
    fetcher.load(`/${lang}/${citySlug}/${spotSlug}/category`);
  }, []);

  return fetcher;
};
