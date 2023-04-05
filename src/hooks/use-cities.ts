import { useQuery } from "react-query";
import { ICity } from "~api/access.api.types";
import { citiesQuery } from "~components/EnsureLocation";

export const useCities = (): ICity[] | undefined => {
  // todo: add types
  const query = useQuery(citiesQuery) as any;
  return query?.data?.data;
};
