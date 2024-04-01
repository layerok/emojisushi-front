import { SortKey } from "~api/menu/menu.api.types";

export const AUTHENTICATED_USER_QUERY_KEY = ["authenticated-user"];

export enum CitySlug {
  Odesa = "odesa",
  Chornomorsk = "chorno",
}

export const LOCATION_CONFIRMED_SEARCH_PARAM = "location_confirmed";

export enum SortModeEnum {
  Default = "default",
  Bestseller = "bestseller",
  Latest = "latest",
  Oldest = "oldest",
  PriceHigh = "price_high",
  PriceLow = "price_low",
  Ratings = "ratings",
}

export const SORT_MODE_KEYS: SortKey[] = [
  SortModeEnum.Default,
  SortModeEnum.Bestseller,
  SortModeEnum.Latest,
  SortModeEnum.Oldest,
  SortModeEnum.PriceHigh,
  SortModeEnum.PriceLow,
  SortModeEnum.Ratings,
];

export const SORT_MODE_SEARCH_PARAM = "sort";
export const SEARCH_QUERY_SEARCH_PARAM = "q";
