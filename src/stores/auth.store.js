import {makeAutoObservable} from "mobx";
import authApi from "../api/auth.api";

class Auth {

    constructor() {
        makeAutoObservable(this);
    }

    authToken = null;

    user = null;

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

    get isAuthorized() {
        return !!this.user;
    }

    fetchUser() {
        authApi.fetchUser().then((res) => {
            console.log('user', res.data);
        })
    }

}

const AuthStore = new Auth();

export {
    AuthStore
}
