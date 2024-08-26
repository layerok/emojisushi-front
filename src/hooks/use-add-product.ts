import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { addProductToCartUpdater } from "~common/queryDataUpdaters";

export const useAddProduct = () => {
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
        addProductToCartUpdater(product, quantity, variant)
      );

      return {
        previousCart,
      };
    },

    onSuccess: (data) => {
      queryClient.setQueryData(cartQuery.queryKey, data);
    },
    onError: (err, newCartProduct, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
  });
};
