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
};

export type ICity = {
  name: string;
  id: number;
  slug: string;
  spots: ISpot[];
  frontend_url: string;
  google_map_url: string;
  phones: string;
};

export type IGetCitiesParams = {
  includeSpots?: boolean;
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
