import {makeAutoObservable} from "mobx";
import {RootStore} from "~stores/stores";

export class AppStore {
    rootStore: RootStore;
    initialLocationSearch: string;
    initialLocationPathname: string;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    loading = true;

    workingHours = [[10, 0], [21, 15]]

    formatWorkingHours() {
        return `${this.workingHours[0][0]}:${"0".concat(this.workingHours[0][1] + "").slice(-2)} до ${this.workingHours[1][0]}:${"0".concat(this.workingHours[1][1] + "").slice(-2)}`
    }

    setLoading = (state) => {
        this.loading = state;
    }

    setInitialLocationPathname = (pathname: string) => {
        this.initialLocationPathname = pathname;
    }

    setInitialLocationSearch = (search: string) => {
        this.initialLocationSearch = search;
    }
}
