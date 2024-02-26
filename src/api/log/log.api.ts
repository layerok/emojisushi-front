import { client } from "~clients/client";
import { appConfig } from "~config/app";

const log = (data) => {
  client.post("/log", {
    ...data,
    version: appConfig.version,
    navigator: {
      userAgent: navigator.userAgent,
      online: navigator.onLine,
    },
  });
};

export const logApi = {
  log,
};
