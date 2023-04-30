import * as S from "./styled";
import { SvgIcon } from "~components";
import { BagSvg } from "~components/svg";
import { ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

type ITinyCartButtonProps = {
  price: ReactNode;
  loading?: boolean;
};

export const TinyCartButton = ({
  price,
  loading = false,
}: ITinyCartButtonProps) => {
  if (loading) {
    return <Skeleton width={55} height={40} />;
  }
  return (
    <S.TinyCartButton>
      <S.Icon>
        <SvgIcon color={"white"}>
          <BagSvg />
        </SvgIcon>
      </S.Icon>
      <S.Price>{price} ₴</S.Price>
    </S.TinyCartButton>
  );
};
