import axios from "axios";
import Cookies from "js-cookie";
import LocalStorageApi from "../api/local-storage.api";

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

client.interceptors.request.use((config = {}) => {
    // send session_id from cookies as parameter for each api request
    const {method} = config;

    const params = method === 'post' ? config.data: config.params || {};
    params.XDEBUG_SESSION_START = true;
    const session_id = Cookies.get('session_id');

    if(session_id) {
        params.session_id = session_id;
    }
    const spot_id = LocalStorageApi.get('spot_id');
    if(spot_id) {
        params.spot_id = spot_id;
    }
    return config;
})

export {
    client
}