import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { updateProductUpdater } from "~common/queryDataUpdaters";

export const useAddProductToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      product,
      quantity,
      variant,
    }: {
      product: Product;
      quantity: number;
      variant?: Variant;
    }) => {
      return EmojisushiAgent.addCartProduct({
        product_id: product.id,
        quantity,
        variant_id: variant?.id,
      });
    },
    onMutate: async ({ product, variant, quantity }) => {
      await queryClient.cancelQueries(cartQuery);

      const previousCart = queryClient.getQueryData(cartQuery.queryKey);

      queryClient.setQueryData(
        cartQuery.queryKey,
        updateProductUpdater(product, quantity, variant)
      );

      return {
        previousCart,
      };
    },
    onError: (err, newCartProduct, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
    onSettled: () => {
      return queryClient.invalidateQueries(cartQuery.queryKey);
    },
  });
};
