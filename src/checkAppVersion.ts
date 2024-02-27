import { getAppVersion } from "src/getAppVersion";

export const LAST_TIME_VERSION_CHECKED_STORAGE_KEY =
  "last_time_app_version_checked";
export const APP_VERSION_STORAGE_KEY = "app_version";

const DEFAULT_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const checkAppVersion = async (
  onMismatch: (client: string, server: string) => void,
  options: {
    interval?: number;
  } = {}
) => {
  const { interval = DEFAULT_INTERVAL } = options;

  const lastTimeChecked = localStorage.getItem(
    LAST_TIME_VERSION_CHECKED_STORAGE_KEY
  );

  if (lastTimeChecked && +lastTimeChecked + interval > Date.now()) {
    return;
  }

  const server = await getAppVersion();

  const clientVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);

  if (clientVersion && clientVersion !== server.version) {
    // the server version and the client version don't match,
    // it means that a user uses the old version of the application
    onMismatch?.(clientVersion, server.version);
  }

  console.log("server", server);

  localStorage.setItem(LAST_TIME_VERSION_CHECKED_STORAGE_KEY, Date.now() + "");
  localStorage.setItem(APP_VERSION_STORAGE_KEY, server.version);
};
