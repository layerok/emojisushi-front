import axios from "axios";
import Cookies from "js-cookie";
import LocalStorageService from "../services/local-storage.service";
import {stores} from "~stores/stores";

const client = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

client.interceptors.request.use((config = {}) => {
    // send session_id from cookies as parameter for each api request
    const {method} = config;

    const params = (method === 'post' ? config.data: config.params) || {};
    params.XDEBUG_SESSION_START = true;
    const session_id = Cookies.get('session_id');

    if(session_id) {
        params.session_id = session_id;
    }
    const spot_id = LocalStorageService.get('spot_id');
    if(!params?.spot_id && spot_id) {
        params.spot_id = spot_id;
    }

    const jwt = Cookies.get('jwt');

    if(jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
})

client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if([406].includes(error?.response?.status)) {
        Cookies.remove('jwt');
        stores.AuthStore.logout();
    }
    return Promise.reject(error);
});

export {
    client
}
