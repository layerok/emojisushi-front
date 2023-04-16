import Skeleton from "react-loading-skeleton";
import { LogoSvg } from "~components/svg/LogoSvg";
import { SvgIcon } from "~components/SvgIcon";
import * as S from "./styled";
import { Link } from "react-router-dom";

type TLogoProps = {
  loading?: boolean;
};

export const Logo = ({ loading = false }: TLogoProps) => {
  if (loading) {
    return (
      <S.Container>
        <Skeleton width={95} height={43} />
      </S.Container>
    );
  }
  return (
    <S.Container>
      <Link to={"/"}>
        <SvgIcon clickable={true} color={"#FFE600"}>
          <LogoSvg />
        </SvgIcon>
      </Link>
    </S.Container>
  );
};
