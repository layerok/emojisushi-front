import { ISvgIconProps, SvgIcon } from "../SvgIcon";
import { CloseSvg } from "../svg/CloseSvg";
import { forwardRef, useContext } from "react";
import { ThemeContext } from "styled-components";

export const CloseIcon = forwardRef<
  HTMLSpanElement,
  ISvgIconProps & {
    width?: string;
    color?: string;
    onClick?: () => void;
  }
>(({ width = "25px", color = "white", onClick = () => {}, ...rest }, ref) => {
  const theme = useContext(ThemeContext);
  return (
    <SvgIcon
      width={width}
      color={color}
      onClick={onClick}
      hoverColor={theme.colors.brand}
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
