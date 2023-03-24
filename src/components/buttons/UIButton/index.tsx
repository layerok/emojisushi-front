import { SvgIcon } from "../../svg/SvgIcon";
import { FlexBox } from "../../FlexBox";
import { forwardRef, HTMLProps, PropsWithChildren } from "react";

export const UIButton = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> &
    PropsWithChildren<{
      text: string;
    }>
>(({ text, children, ...rest }, ref) => {
  return (
    <FlexBox alignItems={"center"} {...rest} ref={ref}>
      <SvgIcon color={"white"} width={"25px"}>
        {children}
      </SvgIcon>
      <div style={{ marginLeft: "10px" }}>{text}</div>
    </FlexBox>
  );
});
