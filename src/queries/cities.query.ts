import { QueryOptions } from "@tanstack/react-query";
import { IGetCitiesRes } from "@layerok/emojisushi-js-sdk";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const citiesQuery: QueryOptions<IGetCitiesRes> = {
  queryFn: () =>
    EmojisushiAgent.getCities({
      includeSpots: true,
      includeDistricts: true,
    }),
  queryKey: ["cities", "list", "all"],
};
