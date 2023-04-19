import { QueryOptions } from "react-query";
import { accessApi } from "~api";

export const citiesQuery: QueryOptions = {
  queryFn: () =>
    accessApi
      .getCities({
        includeSpots: true,
      })
      .then((res) => res.data),
  queryKey: ["cities", "list", "all"],
};
