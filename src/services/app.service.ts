import LocalStorageService from "./local-storage.service";
import {rootStore} from "~stores/stores";
const {SpotsStore, AppStore, AuthStore, CartStore} = rootStore;

class AppService {
    init() {
        AppStore.setInitialLocationPathname(window.location.pathname);
        AppStore.setInitialLocationPathname(window.location.search);
        AppStore.setLoading(true);
        AuthStore.fetchUser();

        const onLoadSpots = () => {
            const selectedId = LocalStorageService.get('spot_id');
            const exist = SpotsStore.items.find((item) => item.id === selectedId);
            if(!selectedId || !exist) {
                SpotsStore.select(SpotsStore.items[0]);
            } else {
                SpotsStore.select(exist);
            }
        }


        Promise.all([
            AuthStore.fetchUser(),
            SpotsStore.loadItems().then(() => onLoadSpots())
        ]).finally(() => {
            CartStore.fetchItems().finally(() => {
                AppStore.setLoading(false);
            });

        })

    }
}

export const appService = new AppService();
