import {client} from "~clients/client";
import {AxiosResponse} from "axios";
import {ISpot} from "~api/access.api.types";

class Access {
    getSpots(params = {}): Promise<AxiosResponse<{
        data: ISpot[]
    }>> {
        return client.get('spots', {
            params
        });
    }
}

const AccessApi = new Access();

export default AccessApi;
