import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useDebounce } from "~common/hooks";
import { Product, Variant } from "~models";
import { cartQuery } from "~queries";
import { updateProductUpdater } from "~common/queryDataUpdaters";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

let inBatch = 0;
let waitingForDebounce = {
  current: false,
};

export function useDebouncedAddProductToCart({
  onDelete,
  delay = 1000,
}: {
  onDelete?: () => boolean;
  delay?: number;
} = {}) {
  const { mutate: addProductToCart } = useMutation({
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
      inBatch -= 1;
      if (inBatch === 0 && !waitingForDebounce.current) {
        queryClient.invalidateQueries(cartQuery.queryKey);
      }
    },
  });
  const queryClient = useQueryClient();

  const accumulateQuantityChange = useRef(0);

  const [debouncedAddProductToCart, cancelAddingProductToCart] = useDebounce(
    addProductToCart,
    delay,
    useCallback(() => {
      accumulateQuantityChange.current = 0;
      inBatch += 1;
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
      queryClient.cancelQueries({
        queryKey: cartQuery.queryKey,
      });
      const previousCart = queryClient.getQueryData(cartQuery.queryKey);

      waitingForDebounce.current = true;

      accumulateQuantityChange.current += delta;
      queryClient.setQueryData(
        cartQuery.queryKey,
        updateProductUpdater(product, delta, variant)
      );

      if (accumulateQuantityChange.current === 0) {
        // don't make unnecessary request
        cancelAddingProductToCart();
      } else {
        debouncedAddProductToCart(
          {
            variant: variant,
            product: product,
            quantity: accumulateQuantityChange.current,
          },
          {
            onError: () => {
              queryClient.setQueryData(cartQuery.queryKey, previousCart);
            },
          }
        );
      }
    };

  return {
    createUpdateHandler,
  };
}
