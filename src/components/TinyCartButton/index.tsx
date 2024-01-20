import * as S from "./styled";
import { SvgIcon } from "~components";
import { BagSvg } from "~components/svg";
import { HTMLProps, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

type ITinyCartButtonProps = {
  price: ReactNode;
  loading?: boolean;
} & HTMLProps<HTMLDivElement>;

export const TinyCartButton = ({
  price,
  loading = false,
  ...rest
}: ITinyCartButtonProps) => {
  if (loading) {
    return <Skeleton width={55} height={40} />;
  }
  return (
    <S.TinyCartButton {...rest}>
      <S.Icon>
        <SvgIcon color={"white"}>
          <BagSvg />
        </SvgIcon>
      </S.Icon>
      <S.Price>{price}</S.Price>
    </S.TinyCartButton>
  );
};
