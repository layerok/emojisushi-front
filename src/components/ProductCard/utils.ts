import { Variant } from "~models/Variant";
import { CartProduct } from "~models/CartProduct";
import { Product } from "~models/Product";

export const findInCart = (
  items: CartProduct[],
  product: Product,
  variant?: Variant
) => {
  if (product.inventoryManagementMethod === "variant") {
    return items.find(
      (cartProduct) =>
        cartProduct.productId === product.id &&
        cartProduct.variantId === variant?.id
    );
  }
  return items.find((cartProduct) => cartProduct.productId === product.id);
};
