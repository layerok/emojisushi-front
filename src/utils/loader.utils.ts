import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import { authApi } from "~api";

export const requireUser = async () => {
  const token = Cookies.get("jwt");
  if (!token) {
    throw redirect("/");
  }
  try {
    return await authApi.fetchUser().then((res) => res.data);
  } catch (e) {
    // 406 simply means that user is not authorzied, no need to throw error in this case
    if (![406].includes(e?.response.status)) {
      throw e;
    }
    throw redirect("/");
  }
};
