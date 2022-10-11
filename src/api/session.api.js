import {client} from "../clients/client";

class Session {
    create = async() => {
        return client.post('session');
    }

    get = async(id) => {
        return client.get(`session/${id}`)
    }
}

export const SessionApi = new Session();