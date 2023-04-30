import { ReactElement } from "react";
import { Await } from "react-router-dom";

type RenderFn = (values: Record<any, unknown>) => ReactElement;

export const AwaitAll = ({ children, ...rest }) => {
  const keys = Object.keys(rest);

  const render = (children) =>
    keys.reduce(
      (acc, key) => {
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
      },
      ((higherValues) =>
        typeof children === "function"
          ? children(higherValues)
          : children) as RenderFn
    );

  return render(children)({});
};
