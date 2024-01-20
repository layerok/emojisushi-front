import { CartProduct, Product } from "~models";
import * as S from "./styled";
import { HeartSvg, SkeletonWrap, SvgIcon } from "~components";
import { useMutation } from "@tanstack/react-query";
import { wishlistApi } from "~api";
import { queryClient } from "~query-client";
import { wishlistsQuery } from "~queries";
import { IGetWishlistRes } from "~api/types";
import { arrImmutableDeleteAt } from "~utils/arr.utils";

type FavoriteButtonProps = {
  cartProduct?: CartProduct;
  product?: Product;
  loading?: boolean;
  favorite?: boolean;
};

export const FavoriteButton = ({
  cartProduct,
  product,
  loading = false,
  favorite,
}: FavoriteButtonProps) => {
  // todo: saving count is useless for now, we don't use it anyhow
  const count = cartProduct?.quantity || 0;

  const addToWishlist = useMutation({
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: number;
      quantity: number;
    }) => {
      return wishlistApi.addItem({
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

  return (
    <S.Wrapper
      onClick={() => {
        addToWishlist.mutate({
          product_id: product.id,
          quantity: count,
        });
      }}
    >
      <S.IconWrapper>
        <SkeletonWrap loading={loading}>
          <SvgIcon
            clickable={true}
            width={"100%"}
            color={favorite ? "#FFE600" : "white"}
            hoverColor={"#FFE600"}
          >
            <HeartSvg />
          </SvgIcon>
        </SkeletonWrap>
      </S.IconWrapper>
    </S.Wrapper>
  );
};
