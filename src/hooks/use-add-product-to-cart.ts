import { useMutation } from "@tanstack/react-query";
import { Product, Variant } from "~models";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const useAddProductToCart = () => {
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
  });
};
