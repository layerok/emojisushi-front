import * as S from "./styled";
import { SvgIcon } from "~components";
import { BagSvg } from "~components/svg";
import { ReactNode } from "react";

type ITinyCartButtonProps = {
  price: ReactNode;
};

export const TinyCartButton = ({ price }: ITinyCartButtonProps) => {
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
