import * as S from "./styled";
import { SpinnerSvg, SvgIcon } from "~components";
import {
  CSSProperties,
  forwardRef,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactNode,
  HTMLProps,
} from "react";
import Skeleton from "react-loading-skeleton";

type IProps = PropsWithChildren<
  HTMLProps<HTMLButtonElement> & {
    width?: string;
    filled?: boolean;
    padding?: string;
    loading?: boolean;
    submitting?: boolean;
    justifyContent?: CSSProperties["justifyContent"];
    outline?: boolean;
    color?: string;
    hoverColor?: string;
    backgroundColor?: string;
    hoverOutline?: boolean;
    minWidth?: string;
    hoverBackgroundColor?: string;
  }
>;

export const Button = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
  const {
    children,
    width,
    filled = false,
    padding,
    loading = false,
    submitting = false,
    justifyContent,
    outline = true,
    color = "#FFE600",
    hoverColor = "black",
    backgroundColor = "transparent",
    hoverBackgroundColor = "#FFE600",
    hoverOutline = true,
    minWidth = "130px",
    ...rest
  } = props;

  if (loading) {
    return <Skeleton height={40} width={width} borderRadius={10} />;
  }

  // todo:  this is propsapacalypses, need to refactor
  return (
    // @ts-ignore
    <S.Button
      minWidth={minWidth}
      outline={outline}
      backgroundColor={submitting ? "#FFE600" : backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverOutline={hoverOutline}
      color={color}
      hoverColor={hoverColor}
      padding={padding}
      filled={filled}
      width={width}
      justifyContent={justifyContent}
      {...rest}
      ref={ref}
    >
      {submitting ? (
        <SvgIcon width={"25px"} color={"black"}>
          <SpinnerSvg />
        </SvgIcon>
      ) : (
        children
      )}
    </S.Button>
  );
});

export const ButtonOutline = forwardRef<
  HTMLButtonElement,
  Omit<IProps, "filled" | "outline">
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest} filled={false} outline={true} ref={ref}>
      {children}
    </Button>
  );
});

export const ButtonFilled = forwardRef<
  HTMLButtonElement,
  Omit<IProps, "color" | "filled" | "backgroundColor">
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <Button
      {...rest}
      backgroundColor={"#FFE600"}
      color={"black"}
      filled={true}
      ref={ref}
    >
      {children}
    </Button>
  );
});

export const ButtonDark = forwardRef<
  HTMLButtonElement,
  Omit<
    IProps,
    | "outline"
    | "color"
    | "backgroundColor"
    | "hoverBackgroundColor"
    | "hoverColor"
    | "hoverOutline"
  >
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Button
      outline={false}
      color={"#FFFFFF"}
      backgroundColor={"#272727"}
      hoverBackgroundColor={"#272727"}
      hoverColor={"#FFE600"}
      hoverOutline={true}
      {...rest}
      ref={ref}
    >
      {children}
    </Button>
  );
});
