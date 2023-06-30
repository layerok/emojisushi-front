import { QueryOptions } from "@tanstack/react-query";
import { accessApi } from "~api";
import { ISpot } from "~api/types";

export const spotQuery = (slugOrId: string): QueryOptions<ISpot> => {
  return {
    queryFn: () =>
      accessApi
        .getSpot({
          slug_or_id: slugOrId,
        })
        .then((res) => res.data),
    queryKey: ["city", slugOrId],
  };
};
