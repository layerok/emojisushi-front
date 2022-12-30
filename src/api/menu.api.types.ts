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
}
