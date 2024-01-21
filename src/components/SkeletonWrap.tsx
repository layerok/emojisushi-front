import Skeleton from "react-loading-skeleton";
import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export const SkeletonWrap = ({
  loading = false,
  borderRadius,
  children,
  style = {},
}: PropsWithChildren<{
  loading: boolean;
  children: ReactNode;
  borderRadius?: string | number;
  style?: CSSProperties;
}>) => {
  if (loading) {
    return (
      <span
        style={{
          position: "relative",
          display: "inline-block",
          ...style,
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Skeleton
            borderRadius={borderRadius}
            height={"100%"}
            width={"100%"}
          />
        </span>

        <span
          style={{
            opacity: 0,
          }}
        >
          {children}
        </span>
      </span>
    );
  }
  return <>{children}</>;
};
