export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
}

export type Nullable<Type> = null | Type;

export type IMeta = {
  total: number;
  offset?: number;
  limit?: number;
}
