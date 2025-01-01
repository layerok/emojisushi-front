import {
  ICartProduct,
  IGetCartRes,
  IProduct,
  IVariant,
} from "@layerok/emojisushi-js-sdk";
import { arrImmutableDeleteAt, arrImmutableReplaceAt } from "~utils/arr.utils";
import { recalculateCartTotals } from "~utils/cart.utils";
import { formatUAHPrice } from "~utils/price.utils";
import { getNewProductPrice } from "~domains/product/product.utils";

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
