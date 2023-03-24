import { IVariant } from "~api/menu.api.types";
import { makeAutoObservable } from "mobx";

export class Variant {
  json: IVariant;
  constructor(json: IVariant) {
    this.json = json;
    makeAutoObservable(this);
  }

  get id() {
    return this.json.id;
  }

  get additionalPrices() {
    return this.json.additional_prices || [];
  }

  get propertyValues() {
    return this.json.property_values || [];
  }

  get posterId() {
    return this.json.poster_id;
  }

  get prices() {
    return this.json.prices || [];
  }

  get oldPrice() {
    return this.additionalPrices.length > 0
      ? this.additionalPrices[0].price_formatted
      : undefined;
  }

  get newPrice() {
    return this.prices.length > 0 ? this.prices[0].price_formatted : undefined;
  }
}
