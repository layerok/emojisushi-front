import {client} from "../clients/client";

class Auth {
    register(credentials, activate = true, autoLogin = true) {
        const {email, password, password_confirmation, name, surname, agree} = credentials;
        return client.post('auth/signup', {
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
            login,
            password
        } = credentials;
        return client.post('auth/signin', {
            login,
            password
        })
    }
}

const AuthApi = new Auth();

export default AuthApi;