import { rootStore } from "~stores/stores";
const { AppStore } = rootStore;

class AppService {
  init() {
    AppStore.setInitialLocationPathname(window.location.pathname);
    AppStore.setInitialLocationSearch(window.location.search);
    AppStore.setLoading(true);

    AppStore.setLoading(false);
  }
}

export const appService = new AppService();
