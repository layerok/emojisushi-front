import Cookies from "js-cookie";
import { generateHash } from "~utils/hash.utils";

class SessionService {
  init = () => {
    const session_id = Cookies.get("session_id");

    if (!session_id) {
      this.create();
    }
  };

  create() {
    Cookies.set("session_id", generateHash(100));
  }

  remove = () => {
    Cookies.remove("session_id");
  };
}

export const sessionService = new SessionService();
