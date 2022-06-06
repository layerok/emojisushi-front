import {makeAutoObservable} from "mobx";

class App {

    constructor() {
        makeAutoObservable(this);
    }

    loading = true;

    setLoading = (state) => {
        this.loading = state;
    }
}

const AppStore = new App();

export {
    AppStore
}