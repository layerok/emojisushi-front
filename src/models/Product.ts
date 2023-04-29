import { IProduct, IWishlist } from "~api/types";
import { makeAutoObservable } from "mobx";
import { Variant } from "./Variant";

export class Product {
  json: IProduct;
  constructor(json) {
    this.json = json;
    makeAutoObservable(this);
  }

  get id() {
    return this.json.id;
  }

  get name() {
    return this.json.name;
  }

  get weight() {
    return this.json.weight;
  }

  get isFavorite() {
    return this.json.is_favorite_;
  }

  set isFavorite(state) {
    this.json.is_favorite_ = state;
  }

  get propertyValues() {
    return this.json.property_values;
  }

  get variants() {
    return this.json.variants.map((variant) => new Variant(variant));
  }

  get variantIds() {
    return this.variants.map((v) => v.id);
  }

  get inventoryManagementMethod() {
    return this.json.inventory_management_method;
  }

  get additionalPrices() {
    return this.json.additional_prices || [];
  }

  get prices() {
    return this.json.prices || [];
  }

  get descriptionShort() {
    return this.json.description_short;
  }

  get description() {
    return this.json.description;
  }

  get imageSets() {
    return this.json.image_sets || [];
  }

  get mainImage() {
    const imageSets = this.imageSets;
    return imageSets.length > 0 &&
      imageSets[0] &&
      imageSets[0].images.length > 0
      ? imageSets[0].images[0].path
      : undefined;
  }

  get categories() {
    return this.json.categories;
  }

  get hideProductsInSpot() {
    return this.json.hide_products_in_spot;
  }

  isHiddenInSpot(spotSlug: string) {
    return !!this.hideProductsInSpot.find((s) => s.slug === spotSlug);
  }

  isInWishlists(wishlists: IWishlist[]): boolean {
    for (let i = 0; i < wishlists.length; i++) {
      const wishlist = wishlists[i];
      if (this.isInWishlist(wishlist)) {
        return true;
      }
    }
    return false;
  }

  isInWishlist(wishlist: IWishlist): boolean {
    for (let j = 0; j < wishlist.items.length; j++) {
      const item = wishlist.items[j];
      if (
        item.product_id === this.id &&
        (!item.variant_id || this.variantIds.includes(item.variant_id))
      ) {
        return true;
      }
    }

    return false;
  }

  get ingredients() {
    return this.descriptionShort ? this.descriptionShort.split(",") : [];

    // Мы не используем свойства
    /*return property_values.map((pv) => {
        return pv.property.name;
    })*/
  }

  getOldPrice(variant: Variant) {
    if (variant) {
      return variant.oldPrice;
    }
    return this.additionalPrices.length > 0
      ? this.additionalPrices[0]
      : undefined;
  }

  getNewPrice(variant: Variant) {
    if (variant) {
      return variant.newPrice;
    }
    return this.prices.length > 0 ? this.prices[0] : undefined;
  }

  get modGroups() {
    return this.propertyValues
      .filter((value) => {
        return value.property?.options?.length > 0;
      })
      .reduce((acc, property) => {
        if (acc.includes(property.property_id)) {
          return acc;
        }
        return [...acc, property.property_id];
      }, [])
      .map((id) => {
        return this.propertyValues.find(
          (property) => property.property_id === id
        );
      });
  }
}
