import { number, route, string } from "react-router-typesafe-routes/dom";

export const ROUTES = {
  INDEX: route(""),
  CATEGORY: route(
    "category",
    {},
    {
      WISHLIST: route("wishlist", {
        searchParams: {
          q: string(),
          sort: string(),
        },
      }),
      SHOW: route(":categorySlug", {
        searchParams: {
          limit: number(),
          q: string(),
          sort: string(),
        },
        params: {
          categorySlug: string(),
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

export const LEAVE_REVIEW_LINK =
  "https://docs.google.com/forms/d/1MVNV7ISzmtkWybXZ9aHovUyk3Ptr0815ismN7d2k4Zw";
