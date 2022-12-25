import {client} from "~clients/client";
import { AxiosResponse} from "axios";
import {IOfflineMallUser, IRainLabUser} from "~api/auth.api.types";

class Auth {

    register(data: {
        email: string;
        password: string;
        password_confirmation: string;
        name: string;
        surname: string;
        agree: boolean;
    }, activate = true, autoLogin = true) {
        const {email, password, password_confirmation, name, surname, agree} = data;
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

    login(credentials: {
        email: string;
        password: string;
    }): Promise<AxiosResponse<{
        data: {
            user: IOfflineMallUser;
            expires: string;
            token: string;
        }
    }>> {
        return client.post('auth/login', credentials)
    }

    restorePassword(email: string) {
        return client.post('auth/restore-password', {
            email,
            redirect_url: window.location.origin + '/reset-password'
        })
    }

    resetPassword(code: string, password: string) {
        return client.post('auth/reset-password', {
            code,
            password,
        })
    }

    fetchUser(): Promise<AxiosResponse<IOfflineMallUser>> {
        return client.get('user');
    }

    updateUser(data: {
        name?: string;
        surname?: string;
    }) {
        return client.post('user', data);
    }

    updateCustomer(data: {
        firstname?: string;
        lastname?: string;
    }) {
        return client.post('customer', data);
    }

}

const AuthApi = new Auth();

export default AuthApi;
