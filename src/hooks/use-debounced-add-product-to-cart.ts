import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useDebounce } from "~common/hooks";
import { cartQuery } from "~domains/cart/cart.query";
import { updateProductUpdater } from "~common/queryDataUpdaters";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { IProduct, IVariant } from "@layerok/emojisushi-js-sdk";

let waitingForDebounce = {
  current: false,
};

const cartProductUpdateMutation = {
  mutationKey: ["updateCartItemQuantity"],
};

export function useDebouncedAddProductToCart({
  delay = 1000,
}: {
  delay?: number;
} = {}) {
  const queryClient = useQueryClient();
  const accumulatedQuantityChange = useRef(0);

  const { mutate: addProductToCart } = useMutation({
    ...cartProductUpdateMutation,
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
    onSettled: () => {
      if (
        queryClient.isMutating(cartProductUpdateMutation) === 1 &&
        !waitingForDebounce.current
      ) {
        queryClient.invalidateQueries(cartQuery);
      }
    },
  });

  const [debouncedAddProductToCart, cancelAddingProductToCart] = useDebounce(
    addProductToCart,
    delay,
    useCallback(() => {
      accumulatedQuantityChange.current = 0;
      waitingForDebounce.current = false;
      queryClient.cancelQueries({
        queryKey: cartQuery.queryKey,
      });
    }, [])
  );

  const createUpdateHandler =
    ({
      delta,
      product,
      variant,
      currentCount,
    }: {
      delta: number;
      product: IProduct;
      variant?: IVariant;
      currentCount: number;
    }) =>
    () => {
      waitingForDebounce.current = true;
      accumulatedQuantityChange.current += delta;
      queryClient.cancelQueries({
        queryKey: cartQuery.queryKey,
      });

      queryClient.setQueryData(
        cartQuery.queryKey,
        updateProductUpdater(product, delta, variant)
      );

      if (accumulatedQuantityChange.current === 0) {
        // don't make unnecessary request
        cancelAddingProductToCart();
      } else {
        debouncedAddProductToCart({
          variant: variant,
          product: product,
          quantity: accumulatedQuantityChange.current,
        });
      }
    };

  return {
    createUpdateHandler,
  };
}
