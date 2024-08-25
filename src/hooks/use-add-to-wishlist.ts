import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistsQuery } from "~queries";
import { IGetWishlistRes } from "@layerok/emojisushi-js-sdk";
import { arrImmutableDeleteAt } from "~utils/arr.utils";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: number;
      quantity: number;
    }) => {
      return EmojisushiAgent.addWishlistItem({
        product_id,
        quantity,
      });
    },
    onMutate: ({ product_id, quantity }) => {
      queryClient.cancelQueries(wishlistsQuery);
      queryClient.setQueryData(
        wishlistsQuery.queryKey,
        (oldWishlists: IGetWishlistRes) => {
          const firstWishlist = oldWishlists[0] || {
            items: [],
            id: 0,
          };
          const wishlistItem = firstWishlist.items.find(
            (item) => item.product_id === product_id
          );
          if (wishlistItem) {
            const index = firstWishlist.items.indexOf(wishlistItem);
            const optimisticItems = arrImmutableDeleteAt(
              firstWishlist.items,
              index
            );
            const optimisticWishlists = [
              {
                ...firstWishlist,
                items: optimisticItems,
              },
              ...oldWishlists.slice(1),
            ];
            return optimisticWishlists;
          } else {
            const firstWishlist = oldWishlists[0] || {
              items: [],
              id: 0,
            };
            const optimisticItem = {
              product_id: product_id,
              quantity: quantity,
              wishlists_id: firstWishlist.id,
            };

            const optimisticWishlists = [
              {
                ...firstWishlist,
                items: [...firstWishlist.items, optimisticItem],
              },
              ...oldWishlists.slice(1),
            ];
            return optimisticWishlists;
          }
        }
      );
    },
    onError: () => {
      queryClient.fetchQuery(wishlistsQuery.queryKey);
    },
  });
};
