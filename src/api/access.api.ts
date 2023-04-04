import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { ISpot, ICity } from "~api/access.api.types";
import { IMeta } from "~common/types";

export type IGetCitiesResponse = {
  data: ICity[];
  meta: IMeta;
};

const getCitiesDefaults: IGetCitiesParams = {
  includeSpots: false,
};

type IGetCitiesParams = {
  includeSpots?: boolean;
  offset?: number;
  limit?: number;
};

class Access {
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
  }

  getCities(
    params: IGetCitiesParams = getCitiesDefaults
  ): Promise<AxiosResponse<IGetCitiesResponse>> {
    return client.get("cities", {
      params,
      // @ts-ignore
      skipAuthRefresh: true,
    });
  }
}

const AccessApi = new Access();

export default AccessApi;
