import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import {
  ISpot,
  IGetCitiesParams,
  IGetCitiesResponse,
} from "~api/access.api.types";
import { IMeta } from "~common/types";

const getCitiesDefaults: IGetCitiesParams = {
  includeSpots: false,
};

export const accessApi = {
  getSpots(params = {}): Promise<
    AxiosResponse<{
      data: ISpot[];
      meta: IMeta;
    }>
  > {
    return client.get("spots", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  },

  getCities(
    params: IGetCitiesParams = getCitiesDefaults
  ): Promise<AxiosResponse<IGetCitiesResponse>> {
    return client.get("cities", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  },
};
