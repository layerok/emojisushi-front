import { QueryOptions } from "@tanstack/react-query";
import { IGetBannersRes } from "~api/banner/banner.api.types";
import { getBanners } from "~api/banner/banner.api";

const bannerQueryKeys = {
  _def: ["banner"],
  all: () => [...bannerQueryKeys._def, "all"],
};

export const bannerQuery: QueryOptions<IGetBannersRes> = {
  queryKey: bannerQueryKeys.all(),
  queryFn: getBanners,
};
