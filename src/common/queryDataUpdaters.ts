import {
  ICartProduct,
  IGetCartRes,
  IGetWishlistRes,
  IProduct,
  IVariant,
} from "@layerok/emojisushi-js-sdk";
import { arrImmutableDeleteAt, arrImmutableReplaceAt } from "~utils/arr.utils";
import { recalculateCartTotals } from "~utils/cart.utils";
import { formatUAHPrice } from "~utils/price.utils";
import { getNewProductPrice } from "~domains/product/product.utils";

export function addProductToWishlistUpdater({
  product_id,
  quantity,
}: {
  product_id: number;
  quantity: number;
}) {
  return function (oldWishlists: IGetWishlistRes) {
    const firstWishlist = oldWishlists[0] || {
      items: [],
      id: 0,
    };
    const wishlistItem = firstWishlist.items.find(
      (item) => item.product_id === product_id
    );
    if (wishlistItem) {
      const index = firstWishlist.items.indexOf(wishlistItem);
      const items = arrImmutableDeleteAt(firstWishlist.items, index);
      return [
        {
          ...firstWishlist,
          items,
        },
        ...oldWishlists.slice(1),
      ];
    } else {
      const firstWishlist = oldWishlists[0] || {
        items: [],
        id: 0,
      };
      const item = {
        product_id: product_id,
        quantity: quantity,
        wishlists_id: firstWishlist.id,
      };

      return [
        {
          ...firstWishlist,
          items: [...firstWishlist.items, item],
        },
        ...oldWishlists.slice(1),
      ];
    }
  };
}

export function removeCartProductUpdater(id: number) {
  return (old: IGetCartRes) => {
    const cartProduct = old.data.find((cartProduct) => cartProduct.id == id);

    if (!cartProduct) {
      return old;
    }

    const index = old.data.indexOf(cartProduct);

    const cartProducts = arrImmutableDeleteAt(old.data, index);

    return {
      ...old,
      data: cartProducts,
      ...recalculateCartTotals(cartProducts),
    };
  };
}

export function updateProductUpdater(
  product: IProduct,
  quantity: number,
  variant?: IVariant
) {
  return (old: IGetCartRes) => {
    const cartProduct = old.data.find(
      (cartProduct) =>
        cartProduct.product.id === product.id &&
        (!variant || variant.id === cartProduct.variant.id)
    );

    if (!cartProduct) {
      const price = getNewProductPrice(product, variant).price;
      const cartProduct: ICartProduct = {
        id: Math.round(Math.random() * 10000),
        price_formatted: formatUAHPrice(price),
        product: product,
        product_id: product.id,
        variant: variant,
        variant_id: variant?.id,
        quantity: quantity,
        price: {
          UAH: price,
        },
      };

      const cartProducts = [...old.data, cartProduct];

      return {
        ...old,
        data: cartProducts,
        ...recalculateCartTotals(cartProducts),
      };
    }
    const index = old.data.indexOf(cartProduct);
    const nextQuantity = cartProduct.quantity + quantity;

    if (nextQuantity < 1) {
      // delete product
      const cartProducts = arrImmutableDeleteAt(old.data, index);

      return {
        ...old,
        data: cartProducts,
        ...recalculateCartTotals(cartProducts),
      };
    }

    const nextCartProduct = {
      ...cartProduct,
      quantity: cartProduct.quantity + quantity,
    };
    const cartProducts = arrImmutableReplaceAt(
      old.data,
      index,
      nextCartProduct
    );

    return {
      ...old,
      data: cartProducts,
      ...recalculateCartTotals(cartProducts),
    };
  };
}
