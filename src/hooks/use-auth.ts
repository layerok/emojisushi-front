import Cookies from "js-cookie";
import { configureAuth } from "react-query-auth";
import { authApi } from "~api";

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth({
    userFn: () =>
      authApi
        .fetchUser()
        .then((res) => res.data)
        .catch((e) => {
          // // 406 simply means that user is not authorzied, no need to throw error in this case
          if (![406].includes(e?.response.status)) {
            throw e;
          }
          return null;
        }),
    loginFn: async ({ email, password }) => {
      const res = await authApi.login({
        email,
        password,
      });
      const { token } = res.data.data;
      Cookies.set("jwt", token);
      return res.data.data.user;
    },
    registerFn: async ({
      email,
      password,
      password_confirmation,
      name,
      surname,
      agree,
      // check if this field is needed
      spot_slug_or_id,
    }) => {
      const res = await authApi.register({
        email,
        password,
        password_confirmation,
        name,
        surname,
        agree,
        // check if this field is needed
        spot_slug_or_id,
      });
      const { token } = res.data.data;
      Cookies.set("jwt", token);
      return res.data.data.user;
    },
    logoutFn: async () => {
      Cookies.remove("jwt");

      return true;
    },
  });
