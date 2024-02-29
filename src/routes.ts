import { number, route, string } from "react-router-typesafe-routes/dom";

export const ROUTES = {
  INDEX: route(""),
  CATEGORY: route(
    "category",
    {},
    {
      SHOW: route(":categorySlug", {
        searchParams: {
          limit: number(),
        },
      }),
    }
  ),
  THANKYOU: route("thankyou", {
    searchParams: {
      order_id: string(),
    },
  }),
  DELIVERYANDPAYMENT: route("dostavka-i-oplata"),
  CHECKOUT: route("checkout"),
  WISHLIST: route("wishlist"),
  ACCOUNT: route(
    "account",
    {},
    {
      PROFILE: route(
        "profile",
        {},
        {
          EDIT: route("edit"),
        }
      ),
      PASSWORD_RECOVERY: route("recover-password"),
      SAVED_ADDRESSES: route("saved-addresses"),
      ORDER: route("orders"),
    }
  ),
  RESET_PASSWORD: route(
    "reset-password",
    {},
    {
      CODE: route(":code"),
    }
  ),
  REFUND: route("refund"),
} as const;
