import Skeleton from "react-loading-skeleton";
import { LogoSvg } from "~components/svg/LogoSvg";
import { SvgIcon } from "~components/svg/SvgIcon";
import * as S from "./styled";
import { Link } from "react-router-dom";

export const Logo = ({ showSkeleton = false }: { showSkeleton?: boolean }) => {
  if (showSkeleton) {
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
