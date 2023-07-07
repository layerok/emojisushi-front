import { QueryOptions } from "@tanstack/react-query";
import { accessApi } from "~api";
import { ISpot } from "~api/types";

export const spotsQuery = (): QueryOptions<ISpot[]> => {
  return {
    queryFn: () => accessApi.getSpots().then((res) => res.data),
    queryKey: ["spots"],
  };
};
