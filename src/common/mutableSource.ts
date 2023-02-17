import { useEffect, useRef, useState } from "react";

const TARGET = Symbol("target");
const GET_VERSION = Symbol("getVersion");

export type Source<TargetType extends any, VersionType extends any> = {
  [TARGET]: TargetType;
  [GET_VERSION]: (target: TargetType) => VersionType;
};

function createMutableSource<TargetType, VersionType>(
  target: TargetType,
  getVersion: (target: TargetType) => VersionType
): Source<TargetType, VersionType> {
  return {
    [TARGET]: target,
    [GET_VERSION]: getVersion
  };
}

function useMutableSource<ValueType, TargetType, VersionType>(
  source: Source<TargetType, VersionType>,
  getSnapshot: (target: TargetType) => ValueType,
  subscribe: (target: TargetType, callback: () => any) => () => void
): ValueType {
  const lastVersoin = useRef<VersionType>();
  const currentVersion = source[GET_VERSION](source[TARGET]);
  const [state, setState] = useState((): [
    typeof source,
    typeof getSnapshot,
    typeof subscribe,
    typeof currentVersion,
    ValueType
  ] => [
    source,
    getSnapshot,
    subscribe,
    currentVersion,
    getSnapshot(source[TARGET])
  ]);
  let currentSnapshot = state[4];

  if (
    state[0] !== source ||
    state[1] !== getSnapshot ||
    state[2] !== subscribe ||
    (currentVersion !== state[3] && currentVersion !== lastVersoin.current)
  ) {
    currentSnapshot = getSnapshot(source[TARGET]);
    setState([source, getSnapshot, subscribe, currentVersion, currentSnapshot]);
  }
  useEffect(() => {
    let didUnsubscribe = false;
    const checkForUpdates = () => {
      if (didUnsubscribe) {
        return;
      }
      lastVersoin.current = source[GET_VERSION](source[TARGET]); // nextVersion
      const nextSnapshot = getSnapshot(source[TARGET]);
      setState((prevState) => {
        if (
          prevState[0] !== source ||
          prevState[1] !== getSnapshot ||
          prevState[2] !== subscribe
        ) {
          return prevState;
        }
        if (prevState[4] === nextSnapshot) {
          return prevState;
        }
        return [
          prevState[0],
          prevState[1],
          prevState[2],
          lastVersoin.current as VersionType,
          nextSnapshot
        ];
      });
    };
    const unsubscribe = subscribe(source[TARGET], checkForUpdates);
    checkForUpdates();
    return () => {
      unsubscribe();
      didUnsubscribe = true;
    };
  }, [source, getSnapshot, subscribe]);
  return currentSnapshot;
}

export { createMutableSource, useMutableSource };
