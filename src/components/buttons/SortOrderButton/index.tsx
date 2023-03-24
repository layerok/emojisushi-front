import { UIButton } from "../UIButton";
import { SortOrderSvg } from "../../svg/SortOrderSvg";
import { forwardRef } from "react";

export const SortOrderButton = forwardRef<
  HTMLDivElement,
  {
    text: string;
  }
>(({ text, ...rest }, ref) => {
  return (
    <UIButton {...rest} text={text} ref={ref}>
      <SortOrderSvg />
    </UIButton>
  );
});
