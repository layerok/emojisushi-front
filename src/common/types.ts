export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

export type Nullable<Type> = null | Type;

export type IMeta = {
  total: number;
  offset?: number;
  limit?: number;
};

export type IFile = {
  content_type: string;
  created_at: string;
  description: null | string;
  disk_name: string;
  extension: string;
  field: string;
  file_name: string;
  file_size: number;
  id: number;
  path: string;
  sort_order: number;
  title: null | string;
  updated_at: string;
};
