import {client} from "../clients/client";
import {Axios, AxiosResponse} from "axios";
import {RainLabUser} from "~api/auth.api.types";

class Auth {

    register(credentials, activate = true, autoLogin = true) {
        const {email, password, password_confirmation, name, surname, agree} = credentials;
        return client.post('auth/register', {
            email,
            password,
            password_confirmation,
            name,
            agree,
            surname,
            activate,
            auto_login: autoLogin
        });
    }

    login(credentials) {
        const {
            email,
            password
        } = credentials;
        return client.post('auth/login', {
            email,
            password
        })
    }

    restorePassword(email) {
        return client.post('auth/restore-password', {
            email,
            redirect_url: window.location.origin + '/reset-password'
        })
    }

    resetPassword(code, password) {
        return client.post('auth/reset-password', {
            code,
            password,
        })
    }

    fetchUser(): Promise<AxiosResponse<RainLabUser>> {
        return client.post('user');
    }

}

const AuthApi = new Auth();

export default AuthApi;
