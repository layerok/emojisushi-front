import Skeleton from "react-loading-skeleton";
import * as S from "./styled";
import { CSSProperties, forwardRef, HTMLProps, PropsWithChildren } from "react";

export type ISvgIconProps = HTMLProps<HTMLSpanElement> &
  PropsWithChildren<{
    color?: string;
    ref: HTMLSpanElement;
    hoverColor?: string;
    width?: string;
    height?: string;
    clickable?: boolean;
    style?: CSSProperties;
    showSkeleton?: boolean;
  }>;

export const SvgIcon = forwardRef<HTMLSpanElement, ISvgIconProps>(
  (
    {
      children,
      color,
      hoverColor,
      width,
      height,
      clickable = false,
      showSkeleton = false,
      style = {},
      ...rest
    },
    ref
  ) => {
    if (showSkeleton) {
      return <Skeleton width={width || 25} height={height || 25} />;
    }

    return (
      <S.Parent
        style={{
          width,
          height,
          cursor: clickable ? "pointer" : "default",
          ...style,
        }}
        ref={ref}
        noDomColor={color}
        hoverColor={hoverColor}
        {...rest}
      >
        {children}
      </S.Parent>
    );
  }
);
