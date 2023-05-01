import React from "react";
import { Await } from "react-router-dom";
const AsyncValuesContext = React.createContext({});

export const useAsyncValues = () => {
  return React.useContext(AsyncValuesContext);
};

export const AwaitAll = ({ children, ...rest }) => {
  const keys = Object.keys(rest);

  const initialValue = (higherValues) => {
    const child =
      typeof children === "function" ? children(higherValues) : children;
    return (
      <AsyncValuesContext.Provider value={higherValues}>
        {child}
      </AsyncValuesContext.Provider>
    );
  };

  const reducer = (acc, key) => {
    return (higherValues) => {
      return (
        <Await resolve={rest[key]}>
          {(value) =>
            acc({
              ...higherValues,
              [key]: value,
            })
          }
        </Await>
      );
    };
  };

  const render = keys.reduce(reducer, initialValue);

  return render({});
};
