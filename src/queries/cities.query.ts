import { QueryOptions } from "@tanstack/react-query";
import { accessApi } from "~api";
import { IGetCitiesRes } from "~api/types";

export const citiesQuery: QueryOptions<IGetCitiesRes> = {
  queryFn: () =>
    accessApi.getCities({
      includeSpots: true,
      includeDistricts: true,
    }),
  queryKey: ["cities", "list", "all"],
};
