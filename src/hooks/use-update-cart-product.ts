import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { CartProduct } from "~models";
import { cartQuery } from "~queries";
import { IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { AxiosError } from "axios";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { updateCartProductUpdater } from "~common/queryDataUpdaters";

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
  const queryClient = useQueryClient();
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

      queryClient.setQueryData(
        cartQuery.queryKey,
        updateCartProductUpdater(item, quantity)
      );

      return {
        previousCart,
      };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries(cartQuery.queryKey);
    },
    ...options,
  });
};
