import * as S from "./styled";
import { SvgIcon } from "../svg/SvgIcon";
import { BagSvg } from "../svg/BagSvg";
import { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

export const TinyCartButton = ({
  price,
  showSkeleton = false,
}: {
  showSkeleton?: boolean;
  price: ReactNode;
}) => {
  if (showSkeleton) {
    return <Skeleton width={55} height={40} />;
  }

  return (
    <S.TinyCartButton>
      <S.Icon>
        <SvgIcon color={"white"}>
          <BagSvg />
        </SvgIcon>
      </S.Icon>
      <S.Price>{price}</S.Price>
    </S.TinyCartButton>
  );
};
