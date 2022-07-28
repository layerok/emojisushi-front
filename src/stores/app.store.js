import {makeAutoObservable} from "mobx";

class App {

    constructor() {
        makeAutoObservable(this);
    }

    loading = true;

    workingHours = [[10, 0], [21, 15]]

    formatWorkingHours() {
        return `${this.workingHours[0][0]}:${"0".concat(this.workingHours[0][1]).slice(-2)} до ${this.workingHours[1][0]}:${"0".concat(this.workingHours[1][1]).slice(-2)}`
    }

    setLoading = (state) => {
        this.loading = state;
    }
}

const AppStore = new App();

export {
    AppStore
}