import * as S from "./styled";
import { FlexBox } from "../FlexBox";
import { SvgIcon } from "../SvgIcon";
import { BagSvg } from "../svg/BagSvg";
import { ButtonFilled } from "../buttons/Button";
import Skeleton from "react-loading-skeleton";

type TCartButton = {
  count?: number;
  total?: number;
  loading?: boolean;
};

export const CartButton = ({
  count = 0,
  total = 0,
  loading = false,
}: TCartButton) => {
  if (loading) {
    return <Skeleton width={170} height={40} borderRadius={10} />;
  }
  return (
    <ButtonFilled padding={"0 24px"} minWidth={"170px"}>
      <FlexBox alignItems={"center"}>
        <S.Icon>
          <SvgIcon color={"black"} width={"25px"} height={"25px"}>
            <BagSvg />
          </SvgIcon>
        </S.Icon>
        <S.Price>{total} ₴</S.Price>
        <S.Delimiter />
        <S.Count>{count}</S.Count>
      </FlexBox>
    </ButtonFilled>
  );
};
