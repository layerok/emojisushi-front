import { getAppVersion } from "src/getAppVersion";

export const LAST_TIME_VERSION_CHECKED_STORAGE_KEY =
  "last_time_app_version_checked";
export const APP_VERSION_STORAGE_KEY = "app_version";

const DEFAULT_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const checkAppVersionAsync = async (
  onMismatch: (client: string, server: string) => void,
  options: {
    interval?: number;
  } = {}
) => {
  const { interval = DEFAULT_INTERVAL } = options;

  persistentThrottle(
    async () => {
      const server = await getAppVersion();

      const clientVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);

      if (clientVersion && clientVersion !== server.version) {
        // the server version and the client version don't match,
        // it means that a user uses the old version of the application
        onMismatch?.(clientVersion, server.version);
      }

      localStorage.setItem(APP_VERSION_STORAGE_KEY, server.version);
    },
    {
      key: LAST_TIME_VERSION_CHECKED_STORAGE_KEY,
      interval,
    }
  );
};

const persistentThrottle = (
  callback: () => void,
  options: {
    key: string;
    interval: number;
  }
) => {
  const { key, interval } = options;
  const lastTimeCallbackFired = localStorage.getItem(key);

  if (lastTimeCallbackFired && +lastTimeCallbackFired + interval > Date.now()) {
    return;
  }

  callback();

  localStorage.setItem(key, Date.now() + "");
};
