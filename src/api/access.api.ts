import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {ISpot, ICity} from "~api/access.api.types";
import {IMeta} from "~common/types";

const getCitiesDefaults: IGetCitiesParams = {
    includeSpots: false
}

type IGetCitiesParams = {
    includeSpots?: boolean;
    offset?: number;
    limit?: number;
}

class Access {
    getSpots(params = {}): Promise<AxiosResponse<{
        data: ISpot[]
        meta: IMeta
    }>> {
        return client.get('spots', {
            params
        });
    }

    getCities(params: IGetCitiesParams = getCitiesDefaults): Promise<AxiosResponse<{
        data: ICity[]
        meta: IMeta
    }>> {
        return client.get('cities', {
            params
        })
    }
}

const AccessApi = new Access();

export default AccessApi;
