import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useDebounce } from "~common/hooks";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { updateProductUpdater } from "~common/queryDataUpdaters";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

let waitingForDebounce = {
  current: false,
};

const cartProductUpdateMutation = {
  mutationKey: ["updateCartItemQuantity"],
};

export function useDebouncedAddProductToCart({
  onDelete,
  delay = 1000,
}: {
  onDelete?: () => boolean;
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
    onSettled: () => {
      if (
        queryClient.isMutating(cartProductUpdateMutation) === 1 &&
        !waitingForDebounce
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
      product: Product;
      variant?: Variant;
      currentCount: number;
    }) =>
    () => {
      if (currentCount + delta <= 0) {
        const preventDefault = onDelete?.();
        if (preventDefault) {
          return;
        }
      }
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
