import Skeleton from "react-loading-skeleton";
import { PropsWithChildren, ReactNode } from "react";

export const SkeletonWrap = ({
  loading = false,
  borderRadius,
  children,
}: PropsWithChildren<{
  loading: boolean;
  children: ReactNode;
  borderRadius?: string | number;
}>) => {
  if (loading) {
    return (
      <span
        style={{
          position: "relative",
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
