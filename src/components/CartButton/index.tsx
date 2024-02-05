import * as S from "./styled";
import { FlexBox, SvgIcon, BagSvg, ButtonFilled } from "~components";

type TCartButton = {
  count?: number;
  total?: string;
};

export const CartButton = ({ count = 0, total = "0 ₴" }: TCartButton) => {
  return (
    <ButtonFilled padding={"0 24px"} minWidth={"170px"} width="auto">
      <FlexBox alignItems={"center"}>
        <S.Icon>
          <SvgIcon color={"black"} width={"25px"} height={"25px"}>
            <BagSvg />
          </SvgIcon>
        </S.Icon>
        <S.Price>{total}</S.Price>
        <S.Delimiter />
        <S.Count>{count}</S.Count>
      </FlexBox>
    </ButtonFilled>
  );
};
