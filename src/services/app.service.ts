import { rootStore } from "~stores/stores";
const { AppStore, AuthStore } = rootStore;

class AppService {
  init() {
    AppStore.setInitialLocationPathname(window.location.pathname);
    AppStore.setInitialLocationSearch(window.location.search);
    AppStore.setLoading(true);
    AuthStore.fetchUser().finally(() => {
      AppStore.setLoading(false);
    });
  }
}

export const appService = new AppService();
