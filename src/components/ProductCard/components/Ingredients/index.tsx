import { useBreakpoint2 } from "~common/hooks";
import { IngredientsTooltip } from "~components";
import { Product } from "~models";
import Skeleton from "react-loading-skeleton";

export const Ingredients = ({
  product,
  loading = false,
}: {
  product?: Product;
  loading?: boolean;
}) => {
  const ingredients = product?.ingredients || [];

  if (loading) {
    return <Skeleton circle width={25} height={25} />;
  }
  return ingredients.length !== 0 && <IngredientsTooltip items={ingredients} />;
};
