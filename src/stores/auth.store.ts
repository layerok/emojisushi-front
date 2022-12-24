import {makeAutoObservable} from "mobx";
import authApi from "../api/auth.api";
import {RainLabUser} from "~api/auth.api.types";

export class AuthStore {

    rootStore;
    constructor(rootStore) {
        makeAutoObservable(this, {
            rootStore: false
        });
        this.rootStore = rootStore;
    }

    authToken = null;

    checkUser = false;

    user: RainLabUser | null = null;

    expires = null;

    setAuthToken = (token) => {
        this.authToken = token;
    }

    setUser = (user) => {
        this.user = user;
    }

    setExpires = (timestamp) => {
        this.expires = timestamp;
    }

    get isAuthorized(): boolean {
        return !!this.user;
    }

    fetchUser() {
        authApi.fetchUser().then((res) => {
            this.setUser(res.data);
        })
    }

    logout() {
        this.setAuthToken(null);
        this.setUser(null);
        this.setExpires(null);
    }

}
