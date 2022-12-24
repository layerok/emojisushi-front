import LocalStorageService from "./local-storage.service";
import {sessionService} from "./session.service";
import {stores} from "~stores/stores";
const {SpotsStore} = stores;

class AppService {
    init() {
        stores.AppStore.setLoading(true);
        sessionService.init();
        stores.AuthStore.fetchUser();
        SpotsStore.loadItems().then(() => {
            const selectedId = LocalStorageService.get('spot_id');
            const exist = SpotsStore.items.find((item) => item.id === selectedId);
            if(!selectedId || !exist) {
                SpotsStore.setSelectedIndex(0);
            } else {
                SpotsStore.setSelectedIndex(SpotsStore.items.indexOf(exist));
            }
        })

    }
}

export const appService = new AppService();
