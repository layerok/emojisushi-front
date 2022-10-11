import Cookies from "js-cookie";
import {SessionApi} from "../api/session.api";

class SessionService {
    init = async () => {
        const session_id = Cookies.get('session_id');

        SessionApi.get(session_id).then((res) => {
            Cookies.set('session_id', res.data.id);
        }).catch(() => {
            SessionApi.create().then((res) => {
                Cookies.set('session_id', res.data.id);
            });
        })
    }
}


export const sessionService = new SessionService();