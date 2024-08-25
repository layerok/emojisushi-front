import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { ICartProduct, IGetCartRes } from "@layerok/emojisushi-js-sdk";
import { arrImmutableDeleteAt, arrImmutableReplaceAt } from "~utils/arr.utils";
import { formatUAHPrice } from "~utils/price.utils";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const useUpdateProduct = () => {
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
        const cartProduct = old.data.find(
          (cartProduct) =>
            cartProduct.product.id === product.id &&
            (!variant || variant.id === cartProduct.variant.id)
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
          } else {
            const optimisticCartProducts = arrImmutableDeleteAt(
              old.data,
              index
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
    onError: (err, newCartProduct, context) => {
      queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
    },
  });
};
