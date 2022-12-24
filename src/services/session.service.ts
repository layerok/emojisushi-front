
import Cookies from "js-cookie";

class SessionService {
    init = () => {
        const session_id = Cookies.get('session_id');
        // todo: create unique session for each spot

        if(!session_id) {
            Cookies.set('session_id', this.gen(100));
        }
    }

    // @ts-ignore
    gen = n => [...Array(n)].map(_=>Math.random()*10|0).join``;
}


export const sessionService = new SessionService();
