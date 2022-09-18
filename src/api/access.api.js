import {client} from "../clients/client";

class Access {
    getSpots(params = {}) {
        return client.get('spots', {
            params
        });
    }
}

const AccessApi = new Access();

export default AccessApi;