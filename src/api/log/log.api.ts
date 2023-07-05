import { client } from "~clients/client";

const log = (data) => {
  client.post("/log", data);
};

export const logApi = {
  log,
};
