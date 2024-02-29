import { client } from "~clients/client";
import { APP_VERSION_STORAGE_KEY } from "~checkAppVersion";

const log = (data) => {
  client.post("/log", {
    version: localStorage.getItem(APP_VERSION_STORAGE_KEY),
    navigator: {
      userAgent: navigator.userAgent,
      online: navigator.onLine,
    },
    ...data,
  });
};

export const logApi = {
  log,
};
