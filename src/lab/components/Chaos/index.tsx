import {Children} from "react";

// навести суеты охота
export const Chaos = ({
  children
                     }) => {
  return Children.map(children, (child) => {
    return <div style={{
      position: 'relative',
      top: `${Math.random() > 0.5 ? '-': ''}${Math.round(Math.random() * 100)}px`,
      left: `${Math.random() > 0.5 ? '-': ''}${Math.round(Math.random() * 100)}px`
    }}>
      {child}
    </div>;
  });
}
