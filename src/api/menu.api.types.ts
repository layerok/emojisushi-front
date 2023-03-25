import { Nullable } from "~common/types";
import { IPrice } from "~api/shipping.api.types";
import { ISpot } from "./access.api.types";

export type ICategory = {
  id: number;
  name: string;
  slug: string;
  code: string;
  meta_title: string;
  meta_description: string;
  sort_order: number;
  google_product_category_id: null | number;
  inherit_property_groups: boolean;
  inherit_review_categories: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  parent_id: number | null;
  nest_left: number;
  nest_right: number;
  nest_depth: number;
  description: string;
  description_short: string;
  poster_id: number;
  published: boolean;
  hide_categories_in_spot: ISpot[];
};

export type IOption = {
  value: string;
  poster_id: string;
};

export type IProperty = {
  id: number;
  name: string;
  slug: string;
  type: string;
  unit: Nullable<string>;
  options: IOption[];
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  poster_id: number;
};

export type IPropertyValue = {
  id: number;
  product_id: number;
  variant_id: Nullable<number>;
  property_id: number;
  value: boolean;
  index_value: string;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  property: IProperty;
};

export type IVariant = {
  id: number;
  product_id: number;
  user_defined_id: Nullable<number>;
  image_set_id: Nullable<number>;
  stock: Nullable<number>;
  reviews_rating: Nullable<string>;
  name: string;
  weight: Nullable<number>;
  length: Nullable<number>;
  width: Nullable<number>;
  height: Nullable<number>;
  published: boolean;
  sales_count: number;
  allow_out_of_stock_purchases: boolean;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  mpn: Nullable<string>;
  gtin: Nullable<string>;
  description_short: Nullable<string>;
  description: Nullable<string>;
  poster_id: Nullable<number>;
  hashid: string;
  product: IProduct;
  prices: IPrice[];
  property_values: IPropertyValue[];
  additional_prices: IPrice[];
};

export type IImage = {
  id: number;
  disk_name: string;
  file_name: string;
  file_size: number;
  content_type: string;
  title: Nullable<string>;
  description: Nullable<string>;
  field: string;
  sort_order: number;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  path: string;
  extension: string;
};

export type IImageSet = {
  id: number;
  name: string;
  product_id: number;
  is_main_set: 0 | 1;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  images: IImage[];
};

export type IProduct = {
  id: number;
  brand_id: Nullable<number>;
  user_defined_id: Nullable<string>;
  name: string;
  slug: string;
  description_short: Nullable<string>;
  description: Nullable<string>;
  meta_title: Nullable<string>;
  meta_description: Nullable<string>;
  meta_keywords: Nullable<string>;
  additional_descriptions: Nullable<any[]>; //jsonable
  additional_properties: Nullable<any[]>; // jsonable
  is_favorite_: boolean;
  weight: Nullable<number>;
  width: Nullable<number>;
  height: Nullable<number>;
  length: Nullable<number>;
  quantity_default: Nullable<number>;
  quantity_min: Nullable<number>;
  quantity_max: Nullable<number>;
  stock: Nullable<number>;
  reviews_rating: Nullable<string>;
  links: Nullable<any[]>; // jsonable
  inventory_management_method: "single" | "variant";
  allow_out_of_stock_purchases: boolean;
  stackable: boolean;
  shippable: boolean;
  price_includes: boolean;
  group_by_property_id: Nullable<number>;
  published: boolean;
  sales_count: number;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  mpn: Nullable<string>;
  gtin: Nullable<string>;
  embeds: Nullable<any[]>; //jsonable
  is_virtual: boolean;
  file_expires_after_days: Nullable<number>;
  file_max_download_count: Nullable<number>;
  file_session_required: boolean;
  poster_id: Nullable<number>;
  poster_type: Nullable<string>;
  hash_id: string;
  variants: IVariant[];
  property_values: IPropertyValue[];
  image_sets: IImageSet[];
  additional_prices: IPrice[];
  prices: IPrice[];
  categories: ICategory[];
  hide_products_in_spot: ISpot[];
};

export type IFilter = {
  id: number;
  name: string;
  slug: string;
  type: string;
  unit: Nullable<string>;
  options: any[];
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  poster_id: number;
  pivot: {
    property_group_id: number;
    property_id: number;
    use_for_variants: 0 | 1;
    filter_type: string;
    sort_order: Nullable<number>;
  };
};

export type IGetCategoriesParams = {
  offset?: number;
  limit?: number;
  spot_id_or_slug?: number;
};

export type SortKey =
  | "bestseller"
  | "ratings"
  | "latest"
  | "price_low"
  | "price_high"
  | "oldest";

export type IGetProductsParams = {
  filter?: string;
  category_slug?: string;
  search?: string;
  sort?: SortKey | null;
  offset?: number;
  limit?: number;
  spot_id_or_slug?: number;
  wishlist_id?: number;
  wishlist?: boolean;
};
