import { client } from "~clients/client";
import { AxiosResponse } from "axios";
import { IUser } from "~api/auth.api.types";

export const authApi = {
  register(
    data: {
      email: string;
      password: string;
      password_confirmation: string;
      name: string;
      spot_slug_or_id: string | number;
      surname: string;
      agree: boolean;
    },
    activate = true,
    autoLogin = true
  ) {
    const { email, password, password_confirmation, name, surname, agree } =
      data;
    return client.post("auth/register", {
      email,
      password,
      password_confirmation,
      name,
      agree,
      surname,
      activate,
      auto_login: autoLogin,
    });
  },

  login(credentials: { email: string; password: string }): Promise<
    AxiosResponse<{
      data: {
        user: IUser;
        expires: string;
        token: string;
      };
    }>
  > {
    return client.post("auth/login", credentials);
  },

  restorePassword(email: string) {
    return client.post("auth/restore-password", {
      email,
      redirect_url: window.location.origin + "/reset-password",
    });
  },

  resetPassword(data: { code: string; password: string }) {
    return client.post("auth/reset-password", data);
  },

  updateUserPassword(data: {
    password_old: string;
    password: string;
    password_confirmation: string;
  }) {
    return client.post("user/password", data);
  },

  fetchUser(): Promise<AxiosResponse<IUser>> {
    const config = {
      params: {},
    };
    return client.get("user", config);
  },

  updateUser(data: { name?: string; surname?: string; phone?: string }) {
    return client.post("user", data);
  },

  updateCustomer(data: { firstname?: string; lastname?: string }) {
    return client.post("user/customer", data);
  },

  addAddress(data: {
    name: string;
    lines: string;
    zip: string;
    city: string;
    two_letters_country_code?: string;
  }) {
    return client.post("user/address", data);
  },

  deleteAddress(id: number) {
    return client.delete("user/address", {
      data: {
        id,
      },
    });
  },

  makeAddressDefault(id: number) {
    return client.post("user/address/default", {
      id,
    });
  },
};
