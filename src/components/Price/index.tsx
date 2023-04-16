import Skeleton from "react-loading-skeleton";
import { FlexBox } from "~components";
import * as S from "./styled";
import { ReactNode } from "react";

type TPriceProps = {
  oldPrice?: ReactNode;
  newPrice: ReactNode;
  loading?: boolean;
};

export const Price = ({ oldPrice, newPrice, loading = false }: TPriceProps) => {
  return (
    <FlexBox flexDirection={"column"}>
      {loading ? (
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
