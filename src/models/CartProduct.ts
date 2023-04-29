import { ICartProduct } from "~api/types";
import { makeAutoObservable } from "mobx";
import { Product } from "./Product";
import { Variant } from "./Variant";

export class CartProduct {
  json: ICartProduct;
  constructor(json) {
    makeAutoObservable(this);
    this.json = json;
  }

  get quantity() {
    return this.json.quantity;
  }

  get product() {
    return new Product(this.json.product);
  }

  get id() {
    return this.json.id;
  }

  get variant() {
    return this.json.variant ? new Variant(this.json.variant) : undefined;
  }

  get productId() {
    return this.json.product_id;
  }

  get variantId() {
    return this.json.variant_id;
  }

  get nameWithMods() {
    return (this.variant?.propertyValues || []).reduce((acc, property) => {
      return acc + " " + property.value;
    }, this.product.name as string);
  }

  get total() {
    return this.product.getNewPrice(this.variant).price * this.quantity;
  }
}
