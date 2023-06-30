import { useQuery } from "@tanstack/react-query";
import { ICity } from "~api/types";
import { citiesQuery } from "~queries/cities.query";

export const useCities = (): ICity[] | undefined => {
  // todo: add types
  const query = useQuery(citiesQuery) as any;
  return query?.data?.data;
};
