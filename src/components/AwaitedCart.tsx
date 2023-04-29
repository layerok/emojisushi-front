import { ReactElement } from "react";
import { useAsyncValue } from "react-router-dom";
import { IGetCartRes } from "~api/types";
import { useOptimisticCartTotals } from "~hooks/use-layout-fetchers";
import { CartProduct } from "~models";

export const AwaitedCart = ({
  children,
}: {
  children: ({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
    items: CartProduct[];
  }) => ReactElement;
}) => {
  const cart = useAsyncValue() as IGetCartRes;
  const items = cart.data.map((json) => new CartProduct(json));
  const { price, quantity } = useOptimisticCartTotals({ items });

  // do I need to call variables as 'optimisticPrice' and 'optimisticQuantity'?

  return children({
    price,
    quantity,
    items,
  });
};
