import { client } from "~clients/client";
import { appConfig } from "~config/app";

const log = (data) => {
  client.post("/log", {
    version: appConfig.version,
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
