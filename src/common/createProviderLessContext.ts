import { createMutableSource, useMutableSource } from "~common/mutableSource";

// read this for an explanation https://dev.to/aslemammad/react-context-without-provider-usemutablesource-4aph

const createStore = (state) => {
  return {
    state: state,
    version: 0,
    listeners: new Set<() => any>(),
  };
};

const cache = new Map();

const getSnapshot = (store: ReturnType<typeof createStore>) => {
  const setState = (
    cb: (prevState: typeof store.state) => typeof store.state
  ) => {
    store.state = cb({ ...store.state });
    store.version++;
    store.listeners.forEach((listener) => listener());
  };
  if (!cache.has(store.state) || !cache.has(store)) {
    cache.clear(); // remove all the old references
    cache.set(store.state, [{ ...store.state }, setState]);
    // we cache the result to prevent useless re-renders
    // the key (store.state) is more consistent than the { ...store.state },
    // because this changes everytime as an object, and it always going to create a new cache
    cache.set(store, store); // check the above if statement, if the store changed completely(reference change), we'll make a new result and new state
  }

  return cache.get(store.state) as [typeof store.state, typeof setState];
};
const subscribe = (
  store: ReturnType<typeof createStore>,
  callback: () => void
) => {
  store.listeners.add(callback);
  return () => store.listeners.delete(callback);
};

// only function below is coded by me in this file,
export const createProviderLessContextHook = (initialValue) => {
  const state = { value: initialValue };
  // the store's state is the object, because underneath useMutableSource destructures store's state
  // if we provide a primitive value as the store's state, like the string 'foo',
  // then useMutableStore will destructure the store's state to {0: 'f', 1: 'o', 2: 'o'},
  // and we don't want that, that is why we wrap 'initialValue' in the object { value: initialValue }
  // to understand what I just wrote, you need to understand what useMutableSource is doing underneath
  // have fun!!!

  const store = createStore(state);

  const source = createMutableSource(store, (store) => store.version);

  return () => {
    const [_state, _setState] = useMutableSource(
      source,
      getSnapshot,
      subscribe
    );

    const setState = (valueOrCb) => {
      if (typeof valueOrCb === "function") {
        _setState(() => ({
          value: valueOrCb(_state.value),
        }));
      } else {
        _setState(() => ({
          value: valueOrCb,
        }));
      }
    };
    return [_state.value, setState];
  };
};
