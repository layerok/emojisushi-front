import { ISvgIconProps, SvgIcon } from "../SvgIcon";
import { CloseSvg } from "../svg/CloseSvg";
import { forwardRef } from "react";

export const CloseIcon = forwardRef<
  HTMLSpanElement,
  ISvgIconProps & {
    width?: string;
    color?: string;
    onClick?: () => void;
  }
>(({ width = "25px", color = "white", onClick = () => {}, ...rest }, ref) => {
  return (
    <SvgIcon
      width={width}
      color={color}
      onClick={onClick}
      hoverColor={"#FFE600"}
      style={{
        cursor: "pointer",
      }}
      {...rest}
      ref={ref}
    >
      <CloseSvg />
    </SvgIcon>
  );
});
