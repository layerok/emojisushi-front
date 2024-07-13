import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CartProduct } from "~models";
import { queryClient } from "~query-client";
import { cartQuery } from "~queries";
import { ICartProduct, IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { arrImmutableReplaceAt } from "~utils/arr.utils";
import { formatUAHPrice } from "~utils/price.utils";
import { AxiosError } from "axios";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const useUpdateCartProduct = (
  options: UseMutationOptions<
    IGetCartRes,
    AxiosError,
    {
      item: CartProduct;
      quantity: number;
    },
    {
      previousCart: IGetCartRes;
    }
  > = {}
) => {
  return useMutation({
    mutationFn: (props) => {
      const { item, quantity } = props;
      return EmojisushiAgent.addCartProduct({
        product_id: item.product.id,
        quantity,
        variant_id: item?.variant?.id,
      });
    },
    onMutate: async ({ item, quantity }) => {
      await queryClient.cancelQueries(cartQuery);

      const previousCart = queryClient.getQueryData(cartQuery.queryKey);

      queryClient.setQueryData(cartQuery.queryKey, (old: IGetCartRes) => {
        const cartProduct = old.data.find(
          (cartProduct) => cartProduct.product.id === item.product.id
        );

        if (cartProduct) {
          const index = old.data.indexOf(cartProduct);
          const optimisticQuantity = cartProduct.quantity + quantity;

          if (optimisticQuantity > 0) {
            const optimisticCartProduct = {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity,
            };
            const optimisticCartProducts = arrImmutableReplaceAt(
              old.data,
              index,
              optimisticCartProduct
            );
            const optimisticTotal = optimisticCartProducts.reduce(
              (acc, cartProduct: ICartProduct) => {
                return (
                  acc + (cartProduct.quantity * cartProduct.price.UAH) / 100
                );
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
        }

        return old;
      });

      return {
        previousCart,
      };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
    ...options,
  });
};
