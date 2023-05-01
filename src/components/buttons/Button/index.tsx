import * as S from "./styled";
import { SpinnerSvg, SvgIcon, IJustifyContent } from "~components";
import { HTMLProps, PropsWithChildren } from "react";
import Skeleton from "react-loading-skeleton";

type IProps = HTMLProps<HTMLButtonElement> &
  PropsWithChildren<{
    width?: string;
    filled?: boolean;
    padding?: string;
    loading?: boolean;
    submitting?: boolean;
    justifyContent?: IJustifyContent;
    outline?: boolean;
    color?: string;
    hoverColor?: string;
    backgroundColor?: string;
    hoverOutline?: boolean;
    minWidth?: string;
    hoverBackgroundColor?: string;
  }>;

export const Button = ({
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
}: IProps) => {
  if (loading) {
    return <Skeleton height={40} width={width} borderRadius={10} />;
  }

  // todo:  this is propsapacalypses, need to refactor
  return (
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
};

export const ButtonOutline = ({
  children,
  ...rest
}: Omit<IProps, "filled" | "outline">) => {
  return (
    <Button {...rest} filled={false} outline={true}>
      {children}
    </Button>
  );
};

export const ButtonFilled = ({
  children,
  ...rest
}: Omit<IProps, "color" | "filled" | "backgroundColor">) => {
  return (
    <Button {...rest} backgroundColor={"#FFE600"} color={"black"} filled={true}>
      {children}
    </Button>
  );
};

export const ButtonDark = ({
  children,
  ...rest
}: Omit<
  IProps,
  | "outline"
  | "color"
  | "backgroundColor"
  | "hoverBackgroundColor"
  | "hoverColor"
  | "hoverOutline"
>) => {
  return (
    <Button
      outline={false}
      color={"#FFFFFF"}
      backgroundColor={"#272727"}
      hoverBackgroundColor={"#272727"}
      hoverColor={"#FFE600"}
      hoverOutline={true}
      {...rest}
    >
      {children}
    </Button>
  );
};
