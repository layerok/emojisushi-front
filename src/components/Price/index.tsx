import Skeleton from "react-loading-skeleton";
import { FlexBox } from "../FlexBox";
import * as S from "./styled";
import { ReactNode } from "react";

export const Price = ({
  oldPrice,
  newPrice,
  showSkeleton = false,
}: {
  oldPrice?: ReactNode;
  newPrice: ReactNode;
  showSkeleton?: boolean;
}) => {
  return (
    <FlexBox flexDirection={"column"}>
      {showSkeleton ? (
        <Skeleton height={40} width={64} />
      ) : (
        <>
          {oldPrice && <S.OldPrice>{oldPrice}</S.OldPrice>}
          <S.NewPrice>{newPrice}</S.NewPrice>
        </>
      )}
    </FlexBox>
  );
};
