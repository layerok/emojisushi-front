import Cookies from "js-cookie";

class SessionService {
  init = () => {
    const session_id = Cookies.get("session_id");

    if (!session_id) {
      this.create();
    }
  };

  create() {
    Cookies.set("session_id", gen(100));
  }

  remove = () => {
    Cookies.remove("session_id");
  };
}

// @ts-ignore
const gen = (n) => [...Array(n)].map((_) => (Math.random() * 10) | 0).join``;

export const sessionService = new SessionService();
