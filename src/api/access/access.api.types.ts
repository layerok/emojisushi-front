import { IFile, IMeta } from "../common/common.api.types";

export type ISpot = {
  id: number;
  name: string;
  bot_id: number;
  chat_id: number;
  code: string;
  phones: string;
  address: string;
  published: number;
  created_at: string;
  updated_at: string;
  poster_id: number;
  html_content: string;
  google_map_url: string;
  slug: string;
  cover: null | string;
  photos: IFile[];
  city: ICity | null;
  frontend_url: string;
  is_main: boolean;
  district: IDistrict;
  temporarily_unavailable: boolean;
};

export type IDistrict = {
  id: number;
  name: string;
  spots: ISpot[];
  city: ICity;
  temporarily_unavailable: boolean;
};

export type ICity = {
  name: string;
  id: number;
  slug: string;
  spots: ISpot[];
  frontend_url: string;
  google_map_url: string;
  phones: string;
  html_content: string;
  districts: IDistrict[];
  temporarily_unavailable: boolean;
};

export type IGetCitiesParams = {
  includeSpots?: boolean;
  includeDistricts?: boolean;
  offset?: number;
  limit?: number;
};

export type IGetCitiesRes = {
  data: ICity[];
  meta: IMeta;
};

export type IGetSpotsRes = {
  data: ISpot[];
  meta: IMeta;
};
