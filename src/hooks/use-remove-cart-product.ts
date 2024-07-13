import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { ICartProduct, IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { arrImmutableDeleteAt } from "~utils/arr.utils";
import { formatUAHPrice } from "~utils/price.utils";
import { AxiosError } from "axios";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const useRemoveCartProduct = (
  options: UseMutationOptions<IGetCartRes, AxiosError, { id: number }> = {}
) => {
  return useMutation({
    mutationFn: (fnProps) => {
      const { id } = fnProps;
      return EmojisushiAgent.removeCartProduct(id + "");
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(cartQuery);

      queryClient.setQueryData(cartQuery.queryKey, (old: IGetCartRes) => {
        const cartProduct = old.data.find(
          (cartProduct) => cartProduct.id == id
        );

        if (cartProduct) {
          const index = old.data.indexOf(cartProduct);

          const optimisticCartProducts = arrImmutableDeleteAt(old.data, index);
          const optimisticTotal = optimisticCartProducts.reduce(
            (acc, cartProduct: ICartProduct) => {
              return acc + (cartProduct.quantity * cartProduct.price.UAH) / 100;
            },
            0
          );

          return {
            ...old,
            data: optimisticCartProducts,
            total: formatUAHPrice(optimisticTotal),
            totalQuantity: optimisticCartProducts.reduce(
              (acc, item: ICartProduct) => acc + item.quantity,
              0
            ),
          };
        }

        return old;
      });
    },
    ...options,
  });
};
