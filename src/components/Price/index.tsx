import { FlexBox } from "../FlexBox";
import * as S from "./styled";
import { ReactNode } from "react";

export const Price = ({
  oldPrice,
  newPrice,
}: {
  oldPrice?: ReactNode;
  newPrice: ReactNode;
}) => {
  return (
    <FlexBox flexDirection={"column"}>
      {oldPrice && <S.OldPrice>{oldPrice}</S.OldPrice>}
      <S.NewPrice>{newPrice}</S.NewPrice>
    </FlexBox>
  );
};
