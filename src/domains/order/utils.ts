import { PHONE_UA_REGEX } from "~domains/order/constants";
import { IUser } from "~api/auth/auth.api.types";

export const isValidUkrainianPhone = (value: string) =>
  PHONE_UA_REGEX.test(value ?? "");

export const getUserFullName = (user: IUser) => `${user.name} ${user.surname}`;
