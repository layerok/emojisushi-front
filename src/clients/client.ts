import axios from "axios";
import Cookies from "js-cookie";
import LocalStorageService from "../services/local-storage.service";
import { stores } from "~stores/stores";
import i18n from "~i18n";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

type IParams = {
  XDEBUG_SESSION_START?: boolean;
  lang?: string;
  session_id?: string;
  spot_id?: number;
};

client.interceptors.request.use((config = {}) => {
  // send session_id from cookies as parameter for each api request
  const { method } = config;

  const params: IParams = {};
  
  const session_id = Cookies.get("session_id");

  if (session_id) {
    params.session_id = session_id;
  }
  // todo: dont add spot_id param to every request
  const spot_id = LocalStorageService.get("spot_id");
  if (!params?.spot_id && spot_id) {
    params.spot_id = spot_id;
  }

  if (process.env.REACT_APP_XDEBUG_SESSION_START === 'true') {
    params.XDEBUG_SESSION_START = true;
  }

  params.lang =
    i18n.resolvedLanguage ||
    i18n.options.lng ||
    LocalStorageService.get("i18next_lang", "uk");

  if (method === "post") {
    config.data = {
      ...params,
      ...(config.data || {}),
    };
  } else {
    config.params = {
      ...params,
      ...(config.params || {}),
    };
  }

  const jwt = Cookies.get("jwt");

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }

  return config;
});

// client.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if([406].includes(error?.response?.status)) {
//         stores.AuthStore.logout();
//     }
//     return Promise.reject(error);
// });

const refreshAuthLogic = (failedRequest) => {
  const jwt = Cookies.get("jwt");
  if (!jwt) {
    return Promise.resolve();
  }
  return client.post("auth/refresh").then((tokenRefreshResponse) => {
    Cookies.set("jwt", tokenRefreshResponse.data.token);
    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + tokenRefreshResponse.data.token;
    return Promise.resolve();
  });
};

createAuthRefreshInterceptor(client, refreshAuthLogic, {
  statusCodes: [401, 406],
});

export { client };
