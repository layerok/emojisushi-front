import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { ICartProduct, IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { formatUAHPrice } from "~utils/price.utils";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

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

      queryClient.setQueryData(cartQuery.queryKey, (old: IGetCartRes) => {
        const optimisticCartProduct = {
          product: product.json,
          product_id: product.id,
          variant: variant,
          variant_id: variant?.id,
          quantity: quantity,
          weight: product.weight,
          price: {
            UAH: product.getNewPrice(variant).price,
          },
        };

        const optimisticCartProducts = [...old.data, optimisticCartProduct];

        const optimisticTotal = optimisticCartProducts.reduce(
          (acc, cartProduct: ICartProduct) => {
            return acc + (cartProduct.quantity * cartProduct.price.UAH) / 100;
          },
          0
        );

        return {
          ...old,
          data: [...old.data, optimisticCartProduct],
          total: formatUAHPrice(optimisticTotal),
          totalQuantity: optimisticCartProducts.reduce(
            (acc, item: ICartProduct) => acc + item.quantity,
            0
          ),
        };
      });

      return {
        previousCart,
      };
    },
    onError: (err, newCartProduct, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
  });
};
