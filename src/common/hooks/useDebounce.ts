import React from "react";
import { debounce } from "~utils/debounce";

export function useDebounce(callback, delay) {
  const callbackRef = React.useRef(callback);
  // Why useLayoutEffect? -> https://kcd.im/uselayouteffect
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  );
}
