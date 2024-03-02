import * as S from "./styled";
import { SpinnerSvg, SvgIcon } from "~components";
import { CSSProperties, forwardRef, PropsWithChildren, HTMLProps } from "react";
import Skeleton from "react-loading-skeleton";
import { useTheme } from "styled-components";

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
  const theme = useTheme();
  const {
    children,
    width,
    filled = false,
    padding,
    loading = false,
    submitting = false,
    justifyContent,
    outline = true,
    color = theme.colors.brand,
    hoverColor = "black",
    backgroundColor = "transparent",
    hoverBackgroundColor = theme.colors.brand,
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
      backgroundColor={submitting ? theme.colors.brand : backgroundColor}
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
  const theme = useTheme();

  return (
    <Button
      {...rest}
      backgroundColor={theme.colors.brand}
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
  const theme = useTheme();
  return (
    <Button
      outline={false}
      color={"#FFFFFF"}
      backgroundColor={"#272727"}
      hoverBackgroundColor={"#272727"}
      hoverColor={theme.colors.brand}
      hoverOutline={true}
      {...rest}
      ref={ref}
    >
      {children}
    </Button>
  );
});
