import { client } from "~clients/client";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import { IGetBannersRes } from "~api/banner/banner.api.types";

export function getBanners(params = {}) {
  return client
    .get<IGetBannersRes>("banners", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig)
    .then((res) => res.data);
}
