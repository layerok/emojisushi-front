import { client } from "~clients/client";
import { ISpot, IGetCitiesParams, IGetCitiesRes } from "./access.api.types";
import { IMeta } from "../common/common.api.types";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";

const getCitiesDefaults: IGetCitiesParams = {
  includeSpots: false,
};

function getSpots(params = {}) {
  return client.get<{
    data: ISpot[];
    meta: IMeta;
  }>("spots", {
    params,
    skipAuthRefresh: true,
  } as AxiosAuthRefreshRequestConfig);
}

function getCities(params: IGetCitiesParams = getCitiesDefaults) {
  return client
    .get<IGetCitiesRes>("cities", {
      params,
      skipAuthRefresh: true,
    } as AxiosAuthRefreshRequestConfig)
    .then((res) => res.data);
}

export const accessApi = {
  getSpots,
  getCities,
};
