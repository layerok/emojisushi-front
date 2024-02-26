import { getAppVersion } from "~getAppVersion";

export const appVersionQuery = {
  queryKey: ["app-version"],
  queryFn: getAppVersion,
};
