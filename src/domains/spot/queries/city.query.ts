import { QueryOptions } from "react-query";
import { accessApi } from "~api";
import { ICity } from "~api/types";

export const cityQuery = (slugOrId: string): QueryOptions<ICity> => {
  return {
    queryFn: () =>
      accessApi
        .getCity({
          slug_or_id: slugOrId,
        })
        .then((res) => res.data),
    queryKey: ["city", slugOrId],
  };
};
