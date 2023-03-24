import * as S from "./styled";
import { cloneElement, forwardRef, ReactElement } from "react";

export const SvgButton = forwardRef<
  HTMLDivElement,
  {
    children: ReactElement;
  }
>(({ children, ...rest }, ref) => {
  return (
    <S.Box {...rest} ref={ref}>
      {cloneElement(children)}
    </S.Box>
  );
});
