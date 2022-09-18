import {client} from "../clients/client";

class Auth {
    register(credentials, activate = true, autoLogin = true) {
        const {email, password, password_confirmation, name, surname} = credentials;
        return client.post('auth/signup', {
            email,
            password,
            password_confirmation,
            name,
            surname,
            activate,
            auto_login: autoLogin
        });
    }
}

const AuthApi = new Auth();

export default AuthApi;