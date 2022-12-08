import {spotsService} from "./spots.service";
import LocalStorageService from "./local-storage.service";
import {SpotsStore} from "../stores/spots.store";
import {sessionService} from "./session.service";

class AppService {
    init() {
        sessionService.init();
        spotsService.loadItems().then(() => {
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