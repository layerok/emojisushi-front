import { accessApi } from "~api";

export const citiesQuery = {
  queryFn: () =>
    accessApi.getCities({
      includeSpots: true,
    }),
  queryKey: ["cities", "list", "all"],
};
