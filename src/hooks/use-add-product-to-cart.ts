import { useMutation } from "@tanstack/react-query";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { IProduct, IVariant } from "@layerok/emojisushi-js-sdk";

export const useAddProductToCart = () => {
  return useMutation({
    mutationFn: ({
      product,
      quantity,
      variant,
    }: {
      product: IProduct;
      quantity: number;
      variant?: IVariant;
    }) => {
      return EmojisushiAgent.addCartProduct({
        product_id: product.id,
        quantity,
        variant_id: variant?.id,
      });
    },
  });
};
