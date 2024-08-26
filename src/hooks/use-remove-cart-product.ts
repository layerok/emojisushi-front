import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { cartQuery } from "~queries";
import { IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { AxiosError } from "axios";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { removeCartProductUpdater } from "~common/queryDataUpdaters";

export const useRemoveCartProduct = (
  options: UseMutationOptions<IGetCartRes, AxiosError, { id: number }> = {}
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (fnProps) => {
      const { id } = fnProps;
      return EmojisushiAgent.removeCartProduct(id + "");
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(cartQuery);

      queryClient.setQueryData(
        cartQuery.queryKey,
        removeCartProductUpdater(id)
      );
    },
    ...options,
  });
};
