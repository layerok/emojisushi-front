import { useOptimisticCartTotalPrice } from "~hooks/use-layout-fetchers";
import { CartProduct } from "~models";

export const OptimisticCartTotalPrice = ({
  items,
}: {
  items: CartProduct[];
}) => {
  const total = useOptimisticCartTotalPrice({ items });
  return <span>{total} ₴</span>;
};
