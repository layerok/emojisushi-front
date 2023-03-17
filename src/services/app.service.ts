import {rootStore} from "~stores/stores";
const { AppStore, AuthStore, CartStore} = rootStore;

class AppService {
    init() {
        AppStore.setInitialLocationPathname(window.location.pathname);
        AppStore.setInitialLocationSearch(window.location.search);
        AppStore.setLoading(true);
        AuthStore.fetchUser().finally(() => {
            Promise.all([CartStore.fetchItems()]).finally(() => {
              AppStore.setLoading(false);
            });

        });




    }
}

export const appService = new AppService();
