import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wishlistsQuery } from "~domains/wishlist/wishlist.query";
import { EmojisushiAgent } from "~lib/emojisushi-js-sdk";
import { addProductToWishlistUpdater } from "~common/queryDataUpdaters";

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
        addProductToWishlistUpdater({ product_id, quantity })
      );
    },
    onError: () => {
      queryClient.fetchQuery(wishlistsQuery.queryKey);
    },
  });
};
