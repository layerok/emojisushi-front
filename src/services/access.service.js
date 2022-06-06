import {client} from "../clients/client";

class Access {
    getSpots(params = {}) {
        return client.get('spots', {
            params
        });
    }
}

const AccessService = new Access();

export default AccessService;