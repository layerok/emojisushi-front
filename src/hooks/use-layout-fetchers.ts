import { Fetcher, useFetchers, useParams } from "react-router-dom";
import { CartProduct } from "~models";

export const useLayoutFetchers = ({
  filterFn,
}: {
  filterFn?: (fetcher: Fetcher) => boolean;
} = {}) => {
  const fetchers = useFetchers();
  const { langSlug, spotSlug, citySlug } = useParams();

  return fetchers.filter((fetcher) => {
    return fetcher.formAction &&
      "/" +
        [langSlug, citySlug, spotSlug].join("/").includes(fetcher.formAction) &&
      !filterFn
      ? true
      : filterFn(fetcher);
  });
};

export const useDeleteLayoutFetchers = () =>
  useLayoutFetchers({
    filterFn: (fetcher) => fetcher.formMethod === "delete",
  });
export const usePostLayoutFetchers = () =>
  useLayoutFetchers({
    filterFn: (fetcher) => fetcher.formMethod === "post",
  });

export const useDeletingCartProducts = () => {
  const deleting = useDeleteLayoutFetchers();
  const updatingFetchers = usePostLayoutFetchers();
  return deleting
    .map(({ formData }) => +formData.get("cart_product_id"))
    .concat(
      updatingFetchers
        .filter(
          ({ formData }) =>
            formData.has("cart_product_id") && formData.get("count") === "0"
        )
        .map(({ formData }) => +formData.get("cart_product_id"))
    );
};

export const useAddingCartProducts = () => {
  const fetchers = usePostLayoutFetchers();

  return fetchers
    .filter(({ formData }) => {
      return !formData.has("cart_product_id");
    })
    .map((fetcher) => ({
      product_id: fetcher.formData.get("product_id"),
      variant_id: fetcher.formData.get("variant_id"),
      count: fetcher.formData.get("count"),
      price: fetcher.formData.get("price"),
    }));
};

export const useUpdatingCartProducts = () => {
  const fetchers = usePostLayoutFetchers();
  return new Map(
    fetchers
      .filter(({ formData }) => {
        return formData.has("cart_product_id");
      })
      .map(({ formData }) => [
        +formData.get("cart_product_id"),
        {
          id: formData.get("cart_product_id"),
          count: formData.get("count"),
          price: formData.get("price"),
        },
      ])
  );
};

// todo: move to separate hook
export const useOptimisticCartTotals = ({
  items,
}: {
  items: CartProduct[];
}) => {
  let total = 0;
  let quantity = 0;

  const addingItems = useAddingCartProducts();
  const updatingItems = useUpdatingCartProducts();

  for (const item of items) {
    if (updatingItems.has(item.id)) {
      const optimisticCount = +updatingItems.get(item.id).count;
      total +=
        (item.product.getNewPrice(item.variant).price / 100) * optimisticCount;

      quantity += optimisticCount;
    } else {
      total += item.total / 100;
      quantity += item.quantity;
    }
  }

  for (const item of addingItems) {
    const optimisticCount = +item.count;
    quantity += optimisticCount;
    total += (optimisticCount * +item.price) / 100;
  }
  return {
    price: total,
    quantity,
  };
};

export const useOptimisticCartTotalPrice = ({
  items,
}: {
  items: CartProduct[];
}) => {
  return useOptimisticCartTotals({ items }).price;
};

export const useOptimisticCartTotalQuantity = ({
  items,
}: {
  items: CartProduct[];
}) => {
  return useOptimisticCartTotals({ items }).quantity;
};
