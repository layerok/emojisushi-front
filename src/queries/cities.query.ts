import { QueryOptions } from "react-query";
import AccessApi from "~api/access.api";

export const citiesQuery: QueryOptions = {
  queryFn: () =>
    AccessApi.getCities({
      includeSpots: true,
    }).then((res) => res.data),
  queryKey: ["cities", "list", "all"],
};
