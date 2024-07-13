import { QueryOptions } from "@tanstack/react-query";
import { IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const cartQuery: QueryOptions<IGetCartRes> = {
  queryKey: ["cart"],
  queryFn: () => EmojisushiAgent.getCartProducts(),
};
